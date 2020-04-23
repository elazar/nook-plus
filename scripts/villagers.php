<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
$browser->request('GET', 'https://animalcrossing.fandom.com/wiki/Villager_list_(New_Horizons)');
$crawler = $browser->getCrawler();
$table = $crawler->filter('table.sortable');

$td_text = fn($td) => $td->text();
$url_data = fn($url) => strpos($url, 'data:') !== 0;

$columns = [ 'name', 'image', 'personality', 'species', 'birthday', 'catchphrase' ];
$rows = [];
foreach ($table->filter('tr') as $tr) {
    $tr = new Crawler($tr);
    $td = $tr->filter('td');
    if (!count($td)) {
        continue;
    }

    $cells = $td->each($td_text);

    $urls = $td->eq(1)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
    $cells[1] = reset(array_filter($urls, $url_data));

    list($gender, $cells[2]) = explode(' ', $cells[2]);

    $cells[4] = preg_replace('/(st|nd|rd|th)$/', '', $cells[4]);

    $cells[5] = trim($cells[5], '"');

    $row = (object) array_combine($columns, $cells);

    $row->gender = $gender === '♂' ? 'Male' : 'Female';

    $link = $td->eq(0)->filter('a')->eq(0)->extract(['href'])[0];
    $row->link = 'https://animalcrossing.fandom.com' . $link;

    $rows[] = $row;
}

echo json_encode($rows);
