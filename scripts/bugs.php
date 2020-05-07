<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
$browser->request('GET', 'https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)');
$crawler = $browser->getCrawler();
$tables = $crawler->filter('table.sortable');

$td_text = fn($td) => $td->text();
$url_data = fn($url) => strpos($url, 'data:') !== 0;
$cell_bool = fn($cell) => $cell !== '-';
$cell_times = function ($cell) {
    if ($cell === 'All day') {
        return array_fill(0, 24, true);
    }

    $ranges = explode(' & ', $cell);
    $times = array_fill(0, 24, false);
    $parse_hour = fn($hour, $meridiem) => ($hour === 12 && $meridiem === 'am' ? 0 : $hour) + (substr($meridiem, 0, 1) === 'a' ? 0 : 12);
    foreach ($ranges as $range) {
        preg_match(
            '/^(?P<start_hour>[0-9]+) (?P<start_meridiem>[ap]m) - (?P<end_hour>[0-9]+) (?P<end_meridiem>[ap]m)$/i',
            strtolower($range),
            $match
        );
        $start_hour = $parse_hour($match['start_hour'], $match['start_meridiem']);
        $end_hour = $parse_hour($match['end_hour'], $match['end_meridiem']) - 1;
        if ($start_hour > $end_hour) {
            $end_hour += 24;
        }
        foreach (range($start_hour, $end_hour) as $hour) {
            $times[$hour % 24] = true;
        }
    }
    return $times;
};

$columns = [ 'name', 'image', 'price', 'location' ];
$months = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];

$rows = [];

$north = $tables->eq(0);
foreach ($north->filter('tr') as $tr) {
    $tr = new Crawler($tr);
    $td = $tr->filter('td');
    if (!count($td)) {
        continue;
    }

    $cells = $td->each($td_text);

    $urls = $td->eq(1)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
    $cells[1] = reset(array_filter($urls, $url_data));

    $cells[2] = (int) $cells[2];

    $row = (object) array_combine($columns, array_slice($cells, 0, count($columns)));
    $row->hours = $cell_times($cells[4]);
    $row->months = new stdClass;
    $row->months->north = (object) array_combine(
        $months,
        array_map($cell_bool, array_slice($cells, count($columns) + 1))
    );

    $link = $td->eq(0)->filter('a')->eq(0)->extract(['href'])[0];
    $row->link = 'https://animalcrossing.fandom.com' . $link;

    $rows[] = $row;
}

$south = $tables->eq(1);
foreach ($south->filter('tr') as $tr) {
    $tr = new Crawler($tr);
    $td = $tr->filter('td');
    if (!count($td)) {
        continue;
    }

    $cells = $td->each($td_text);
    $name = $cells[0];
    $row = reset(array_filter($rows, fn($row) => $row->name === $name));
    $row->months->south = (object) array_combine(
        $months,
        array_map($cell_bool, array_slice($cells, count($columns) + 1))
    );
}

echo json_encode($rows, \JSON_PRETTY_PRINT);
