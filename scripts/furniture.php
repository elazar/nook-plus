<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());

$parse_price = function ($text) {
    if ($text === 'N/A') {
        return null;
    }
    $text = preg_replace('/[^0-9]/', '', $text);
    if ($text === '') {
        return null;
    }
    return (int) $text;
};

$url_data = fn($url) => strpos($url, 'data:') !== 0;

$nullify = fn($value) => in_array($value, [ 'N/A', '', '*', '❔' ]) ? null : $value;

$format_longform = function ($value) {
    $trim = " ,:\\*\x{2754}";
    $value = str_replace(' )', ')', $value);
    $value = preg_replace("/^[$trim]+|[$trim]+$/u", '', $value);
    return $value;
};

$subpages = [
    'Housewares',
    'Miscellaneous',
    'Wall-mounted',
    'Wallpaper',
    'Flooring',
    'Rugs',
];

$rows = [];

foreach ($subpages as $subpage) {
    $browser->request('GET', 'https://animalcrossing.fandom.com/wiki/Furniture_(New_Horizons)/' . $subpage);
    $crawler = $browser->getCrawler();
    $tables = $crawler->filter('table.roundy');

    foreach ($tables as $table) {
        $trs = (new Crawler($table))->filter('tr');
        if (count($trs) < 2) {
            continue;
        }

        foreach ($trs as $tr) {
            $tr = new Crawler($tr);
            $td = $tr->filter('td');
            $td_count = count($td);
            if ($td_count < 5) {
                continue;
            }

            $row = new stdClass;

            $urls = $td->eq(0)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
            $row->image = empty($urls) ? null : reset(array_filter($urls, $url_data));

            $row->name = $td->eq(1)->text();

            $link = $td->eq(1)->filter('a')->eq(0)->extract(['href'])[0];
            $row->link = $link ? 'https://animalcrossing.fandom.com' . $link : null;

            $row->buy_price = $parse_price($td->eq(2)->text());
            $row->sell_price = $parse_price($td->eq(3)->text());

            $link = $td->eq(4)->filter('a');
            if (count($link) > 0) {
                $row->source = $link->eq(0)->extract(['title'])[0];
            }

            if ($td_count === 8) {
                $variations = $nullify($td->eq(5)->text());
                $row->variations = $variations ? $format_longform($variations) : null;

                $customize = $nullify($td->eq(6)->text());
                $row->customize = $customize ? $format_longform($customize) : null;
            }

            $rows[] = $row;
        }
    }
}

echo json_encode($rows, \JSON_PRETTY_PRINT);
