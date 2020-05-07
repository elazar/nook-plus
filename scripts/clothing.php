<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$pages = [
    'Tops',
    'Bottoms',
    'Dresses',
    'Hats',
    'Accessories',
    'Socks',
    'Shoes',
    'Bags',
    'Umbrellas',
];

$url_data = fn($url) => strpos($url, 'data:') !== 0;

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

$parse_longform = function ($text) {
    $text = preg_replace('/\s*<br( \/)?>\s*/', ', ', $text);
    $text = preg_replace('/<[^>]+>/', '', $text);
    $text = preg_replace('/(\s*,\s*)+/', ', ', $text);
    $text = trim($text, " \t\n,|-");
    $text = html_entity_decode($text);
    if ($text === 'N/A' || $text === '*') {
        return null;
    }
    return $text;
};

$rows = [];

foreach ($pages as $page) {
    $browser = new HttpBrowser(HttpClient::create());
    $browser->request('GET', 'https://animalcrossing.fandom.com/wiki/Clothing_(New_Horizons)/' . $page);
    $crawler = $browser->getCrawler();
    $table = $crawler->filter('table.roundy')->eq(0);

    foreach ($table->filter('tr') as $tr) {
        $tr = new Crawler($tr);
        $td = $tr->filter('td');
        if (!count($td)) {
            continue;
        }

        $row = new stdClass;

        $row->name = $td->eq(0)->text();

        $urls = $td->eq(1)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
        $row->image = empty($urls) ? null : reset(array_filter($urls, $url_data));

        $row->buy_price = $parse_price($td->eq(2)->text());

        $row->sell_price = $parse_price($td->eq(3)->text());

        $row->source = $parse_longform($td->eq(4)->html());

        $variation = $td->eq(5);
        if (count($variation)) {
            $row->variation = $parse_longform($variation->html());
        }

        $rows[] = $row;
    }
}

echo json_encode($rows, \JSON_PRETTY_PRINT);
