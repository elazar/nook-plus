<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
$browser->request('GET', 'https://animalcrossing.fandom.com/wiki/Artwork_(New_Horizons)');
$crawler = $browser->getCrawler();
$tables = $crawler->filter('table.wikitable');

$url_data = fn($url) => strpos($url, 'data:') !== 0;

foreach ($tables as $table) {
    $table = new Crawler($table);
    foreach ($table->filter('tr') as $tr) {
        $tr = new Crawler($tr);
        $td = $tr->filter('td');
        if (!count($td)) {
            continue;
        }

        $name = $td->eq(0)->text();

        $link = 'https://animalcrossing.fandom.com' . $td->eq(0)->filter('a')->eq(0)->extract(['href'])[0];

        $urls = $td->eq(2)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
        $image = reset(array_filter($urls, $url_data));

        $description = $td->eq(3)->text();

        $forgeable = strpos($td->eq(1)->text(), 'N/A') === false;

        $row = (object) compact('name', 'link', 'image', 'description', 'forgeable');

        $rows[] = $row;
    }
}

echo json_encode($rows, \JSON_PRETTY_PRINT);
