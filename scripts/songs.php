<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
$browser->request('GET', 'https://animalcrossing.fandom.com/wiki/K.K._Slider_song_list_(New_Horizons)');
$crawler = $browser->getCrawler();
$tds = $crawler->filter('table.roundy')->eq(1)->filter('td');

$url_data = fn($url) => strpos($url, 'data:') !== 0;

$rows = [];

foreach ($tds as $td) {
    $td = new Crawler($td);

    $name = $td->filter('a')->eq(1)->text();

    $urls = $td->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
    $image = empty($urls) ? null : reset(array_filter($urls, $url_data));

    $link = 'https://animalcrossing.fandom.com' . $td->filter('a')->eq(1)->extract(['href'])[0];

    $request = count($td->filter('i')) > 0;

    $row = (object) compact('name', 'image', 'link', 'request');

    $rows[] = $row;
}

echo json_encode($rows, \JSON_PRETTY_PRINT);
