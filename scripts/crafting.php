<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
$browser->request('GET', 'https://animalcrossing.fandom.com/wiki/Crafting_materials_(New_Horizons)');
$crawler = $browser->getCrawler();
$tables = $crawler->filter('table.roundy');

$url_data = fn($url) => strpos($url, 'data:') !== 0;

$html_data = function ($html) {
    $html = preg_replace('/<br(?: \/)?>/', ', ', $html);
    $html = preg_replace('/<[^>]+>/', '', $html);
    $html = preg_replace('/\s+\(/', ' (', $html);
    $html = str_replace(')', '),', $html);
    $html = preg_replace('/\s*,\s*/', ', ', $html);
    $html = str_replace("\n", '', $html);
    $html = trim($html, " \n,");
    return $html ?: null;
};

$parse_source = function ($td, $index) use ($html_data) {
    //  0 - General materials (all season) > Natural resources
    //  1 - General materials (all season) > Other
    // 12 - Shells
    // 14 - Seasonal/event > Spring 
    // 15 - Seasonal/event > Summer
    // 16 - Seasonal/event > Autumn
    // 17 - Seasonal/event > Winter
    if (in_array($index, [0, 1, 12, 14, 15, 16, 17])) {
        return $html_data($td->eq(2)->html());
    }

    // 2 - Fruits
    if ($index === 2) {
        return 'Dodo Airlines Mystery tour';
    }

    //  3 - Flowers > Black
    //  4 - Flowers > Blue
    //  5 - Flowers > Green
    //  6 - Flowers > Orange
    //  7 - Flowers > Pink
    //  8 - Flowers > Purple
    //  9 - Flowers > Red
    // 10 - Flowers > White
    // 11 - Flowers > Yellow
    if (in_array($index, [3, 4, 5, 6, 7, 8, 9, 10, 11])) {
        return null;
    }

    // 13 - Star fragments
    if ($index === 13) {
        $dates = $td->eq(2)->text();
        $dates = $dates !== 'Throughout the year' ? ' (' . $dates . ')' : '';
        return 'Beach after wishing on a meteor shower' . $dates;
    }

    throw new \RuntimeException('Unrecognized index: ' . $index);
};

$parse_price = function ($td, $index) use ($html_data) {
    //  0 - General materials (all season) > Natural resources
    //  1 - General materials (all season) > Other
    // 12 - Shells
    // 13 - Star fragments
    // 14 - Seasonal/event > Spring 
    // 15 - Seasonal/event > Summer
    // 16 - Seasonal/event > Autumn
    // 17 - Seasonal/event > Winter
    if (in_array($index, [0, 1, 12, 13, 14, 15, 16, 17])) {
        return $html_data($td->eq(3)->html());
    }

    //  3 - Flowers > Black
    //  4 - Flowers > Blue
    //  5 - Flowers > Green
    //  6 - Flowers > Orange
    //  7 - Flowers > Pink
    //  8 - Flowers > Purple
    //  9 - Flowers > Red
    // 10 - Flowers > White
    // 11 - Flowers > Yellow
    if (in_array($index, [3, 4, 5, 6, 7, 8, 9, 10, 11])) {
        return $html_data($td->eq(2)->html());
    }

    // 2 - Fruits
    if ($index === 2) {
        if ($td->eq(0)->text() === 'Coconut') {
            return '250';
        }
        return '100 native, 500 foreign';
    }

    throw new \RuntimeException('Unrecognized index: ' . $index);
};

$parse_always = function ($td, $index) {
    // 13 - Star fragments
    if ($index === 13) {
        $dates = $td->eq(2)->text();
        return $dates === 'Throughout the year';
    }

    // 14 - Seasonal/event > Spring 
    // 15 - Seasonal/event > Summer
    // 16 - Seasonal/event > Autumn
    // 17 - Seasonal/event > Winter
    if (in_array($index, [14, 15, 16, 17])) {
        return false;
    }

    return true;
};

$rows = [];

foreach ($tables as $index => $table) {
    if ($index > 17) {
        continue;
    }

    $table = new Crawler($table);
    foreach ($table->filter('tr') as $tr) {
        $tr = new Crawler($tr);
        $td = $tr->filter('td');
        if (!count($td)) {
            continue;
        }

        $row = new stdClass;

        $row->name = $td->eq(0)->text();

        $link = $td->eq(0)->filter('a')->eq(0)->extract(['href'])[0];
        $row->link = $link ? 'https://animalcrossing.fandom.com' . $link : null;

        $urls = $td->eq(1)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
        $row->image = reset(array_filter($urls, $url_data));

        $row->source = $parse_source($td, $index);

        $row->price = $parse_price($td, $index);

        $row->always = $parse_always($td, $index);

        $rows[] = $row;
    }
}

echo json_encode($rows, \JSON_PRETTY_PRINT);
