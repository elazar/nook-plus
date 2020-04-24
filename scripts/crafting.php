<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
$browser->request('GET', 'https://animalcrossing.fandom.com/wiki/Crafting_materials_(New_Horizons)');
$crawler = $browser->getCrawler();
$tables = $crawler->filter('table.article-table');

$parse_rows = function ($table, $always) {
    $url_data = fn($url) => strpos($url, 'data:') !== 0;
    $html_data = function ($html) {
        $html = preg_replace('/<br(?: \/)?>/', ' ', $html);
        $html = preg_replace('/<[^>]+>/', '', $html);
        $html = preg_replace('/\s+\(/', ' (', $html);
        $html = str_replace(')', '),', $html);
        $html = trim($html, " \n,");
        return $html;
    };

    $rows = [];

    foreach ($table->filter('tr') as $tr) {
        $tr = new Crawler($tr);
        $td = $tr->filter('td');
        if (!count($td)) {
            continue;
        }

        $row = new stdClass;

        $row->name = $td->eq(0)->text();

        $link = $td->eq(0)->filter('a')->eq(0)->extract(['href'])[0];
        $row->link = 'https://animalcrossing.fandom.com' . $link;

        $urls = $td->eq(1)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
        $row->image = reset(array_filter($urls, $url_data));

        $row->source = $html_data($td->eq(2)->html());

        $row->price = $html_data($td->eq(3)->html()) ?: null;

        $row->always = $always;

        $rows[] = $row;
    }

    return $rows;
};

$rows = array_merge(
    $parse_rows($tables->eq(0), true),
    $parse_rows($tables->eq(1), false)
);

echo json_encode($rows);
