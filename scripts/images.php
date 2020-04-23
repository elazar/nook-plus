<?php

$json = $argv[1];
$path = $argv[2];

if (!file_exists($path)) {
    mkdir($path);
}

$data = json_decode(file_get_contents($json));
foreach ($data as $row) {
    $dst = $path . '/' . $row->name . '.png';
    echo $dst, PHP_EOL;
    file_put_contents($dst, file_get_contents($row->image));
}
