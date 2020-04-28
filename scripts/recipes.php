<?php

require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;

$parse_page = function ($page, $category) {
    $browser = new HttpBrowser(HttpClient::create());
    $browser->request('GET', 'https://animalcrossing.fandom.com/wiki/DIY_recipes' . ($page ? '/' . $page : ''));
    $crawler = $browser->getCrawler();
    $table = $crawler->filter('table.article-table')->eq(0);

    $url_data = fn($url) => strpos($url, 'data:') !== 0;

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
        $row->link = $link ? 'https://animalcrossing.fandom.com' . $link : null;

        $urls = $td->eq(1)->filter('img')->eq(0)->extract(['src', 'data-src'])[0];
        $row->image = empty($urls) ? null : reset(array_filter($urls, $url_data));

        $materials = trim($td->eq(2)->html());
        $materials = preg_replace('/<br( \/)?>/', ', ', $materials);
        $materials = preg_replace('/<[^>]+>/', '', $materials);
        $row->materials = $materials;

        $row->source = trim($td->eq(4)->text()) ?: null;

        $row->price = (int) trim(str_replace(',', '', $td->eq(5)->text()));

        $recipe = $td->eq(6);
        if ($recipe->length) {
            $row->recipe = trim($recipe->text()) !== '';
        }

        $row->category = $category;

        $rows[] = $row;
    }

    return $rows;
};

$pages = [
    'Tools',
    'Housewares',
    'Miscellaneous',
    'Wall-mounted',
    'Wallpaper,_rugs_and_flooring',
    'Equipment',
    'Other',
    '',
];

$rows = [];

foreach ($pages as $page) {
    $category = $page ? str_replace('_', ' ', $page) : 'Unconfirmed';
    $rows = array_merge($rows, $parse_page($page, $category));
}

echo json_encode($rows);
