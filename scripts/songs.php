<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
$browser->request('GET', 'https://animalcrossing.fandom.com/wiki/K.K._Slider_song_list_(New_Horizons)');
$crawler = $browser->getCrawler();
$ol = $crawler->filter('ol');

$rows = [];

foreach ($ol->filter('li') as $li) {
    $li = new Crawler($li);

    $name = $li->text();

    $link = 'https://animalcrossing.fandom.com' . $li->filter('a')->eq(0)->extract(['href'])[0];

    $request = count($li->filter('i')) > 0;

    $row = (object) compact('name', 'link', 'request');

    $rows[] = $row;
}

echo json_encode($rows);
