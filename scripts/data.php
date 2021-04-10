<?php

/**
 * USAGE:
 *
 * 1. Export this spreadsheet to a .xlsx file: https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit#gid=1613395680
 * 2. If needed, install xlsx2csv: sudo easy_install xlsx2csv
 * 3. Convert the spreadsheet to a .csv file: xlsx2csv Data\ Spreadsheet\ for\ Animal\ Crossing\ New\ Horizons.xlsx -a -E 'Read Me' > data.csv
 * 4. Run this script, passing it the name of the .csv file: php data.php data.csv
 * 5. Find the exported data files in ./src/data relative to the root of this repository.
 *
 * DEVELOPMENT NOTES:
 *
 * Easy way to check links:
 * cat src/data/artwork.json | jq '.' | grep link | awk '{print $2}' | sed 's/[",]\|#.\+$//g' | uniq | while read url; do curl -o /dev/null -s -w "%{url_effective} %{http_code}\n" $url; done | grep -v 200
 */

$files = [
    'artwork',
    'bugs',
    'clothing',
    'crafting',
    'fish',
    'fossils',
    'furniture',
    'recipes',
    'seacreatures',
    'songs',
    'villagers',
];

function getLink(string $section, string $uniqueId): string
{
    $link = 'https://catalogue.ac/?i=';

    if ($section === 'Recipes') {
        $link .= 'd';
    } elseif (in_array($section, [
        'Tops',
        'Dress-Up',
        'Bottoms',
        'Headwear',
        'Accessories',
        'Socks',
        'Shoes',
        'Bags',
        'Umbrellas',
        'Clothing Other',
    ])) {
        $link .= 'c';
    }
    $link .= $uniqueId;

    return $link;
}

function getImage(string $dir, string $filename): string
{
    return "https://acnhcdn.com/latest/${dir}Icon/$filename.png";
}

function getAvailability(array $row): array
{
    $hours = null;
    $months = ['north' => [], 'south' => []];
    $parse = fn($hour, $meridiem) => ($hour === 12 && $meridiem === 'AM' ? 0 : $hour) + (substr($meridiem, 0, 1) === 'A' ? 0 : 12);
    foreach (['N' => 'north', 'S' => 'south'] as $abbr => $hemisphere) {
        foreach (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as $month) {
            $index = "${abbr}H $month";
            $available = $row[$index] !== 'NA';
            $months[$hemisphere][strtolower($month)] = $available;
            if ($available) {
                if ($row[$index] === 'All day') {
                    $hours = array_fill(0, 24, true);
                } else {
                    $ranges = explode('; ', $row[$index]);
                    $hours = array_fill(0, 24, false);
                    foreach ($ranges as $range) {
                        $split = preg_split('/[\s ]+/', $range);
                        $start = $parse($split[0], $split[1]);
                        $end = $parse($split[3], $split[4]) - 1;
                        if ($start > $end) {
                            $end += 24;
                        }
                        foreach (range($start, $end) as $hour) {
                            $hours[$hour % 24] = true;
                        }
                    }
                }
            }
        }
    }
    return [$hours, $months];
}

$fp = fopen($argv[1], 'r');
$data = array_combine($files, array_fill(0, count($files), []));
$all = [];
$craftingMaterials = [];
while ($row = fgetcsv($fp)) {

    if (preg_match('/^-------- [0-9]+ - (.+)$/', $row[0], $match)) {
        $section = $match[1];
        $header = fgetcsv($fp);
        $row = fgetcsv($fp);
    }
    $row = array_combine($header, $row);
    $row['Name'] = ucfirst($row['Name']);

    if (isset($row['Internal ID'])) {
        $image = $row['Filename'] ?? $row['Icon Filename'] ?? $row['DIY Icon Filename'] ?? null;
        if (!$image) {
            continue;
        }
        $all[$row['Name']] = [
            'name' => $row['Name'],
            'link' => getLink($section, $row['Internal ID']),
            'image' => getImage('Menu', $image),
            'source' => $row['Source'],
            'price' => (int) $row['Sell'],
            'always' => $row['Season/Event Exclusive'] !== 'Yes',
        ];
    }

    /**
     * Artwork
     */
    if (in_array($section, [
        'Art',
    ])) {

        // Skip duplicate entries for forgeable versions
        $lastIndex = array_key_last($data['artwork']);
        $lastRow = $data['artwork'][$lastIndex];
        if ($row['Name'] === $lastRow['name']
            && $row['Genuine'] !== ($lastRow['forgeable'] ? 'No' : 'Yes')) {
            $data['artwork'][$lastIndex]['forgeable'] = true;
            continue;
        }

        $data['artwork'][] = [
            'name' => $row['Name'],
            'link' => getLink($section, $row['Internal ID']),
            'image' => getImage('Ftr', $row['Filename']),
            'description' => $row['Description'],
            'forgeable' => $row['Genuine'] === 'No',
        ];

    }

    /**
     * Bugs
     */
    if (in_array($section, [
        'Insects',
    ])) {

        [$hours, $months] = getAvailability($row);

        $data['bugs'][] = [
            'name' => $row['Name'],
            'image' => getImage('Menu', $row['Icon Filename']),
            'price' => (int) $row['Sell'],
            'location' => $row['Where/How'],
            'hours' => $hours,
            'months' => $months,
            'link' => getLink($section, $row['Internal ID']),
        ];

    }

    /**
     * Clothing
     */
    if (in_array($section, [
        'Tops',
        'Dress-Up',
        'Bottoms',
        'Headwear',
        'Accessories',
        'Socks',
        'Shoes',
        'Bags',
        'Umbrellas',
        'Clothing Other',
    ])) {

        $clothing = [
            'name' => $row['Name'],
            'image' => getImage(isset($row['Closet Image']) ? 'Closet' : 'Ftr', $row['Filename']),
            'buy_price' => (int) $row['Buy'],
            'sell_price' => (int) $row['Sell'],
            'source' => $row['Source'],
        ];

        if ($row['Variation'] !== 'NA' && $row['Variation'] !== null) {
            $clothing['variation'] = $row['Variation'];
        }

        $data['clothing'][] = $clothing;
 
    }

    /**
     * Fish
     */
    if (in_array($section, [
        'Fish',
    ])) {

        [$hours, $months] = getAvailability($row);

        $data['fish'][] = [
            'name' => $row['Name'],
            'image' => getImage('Menu', $row['Icon Filename']),
            'price' => (int) $row['Sell'],
            'location' => $row['Where/How'],
            'shadow' => $row['Shadow'],
            'link' => getLink($section, $row['Internal ID']),
            'hours' => $hours,
            'months' => $months,
        ];

    }

    /**
     * Fossils
     */
    if (in_array($section, [
        'Fossils',
    ])) {

        $data['fossils'][] = [
            'name' => $row['Name'],
            'image' => getImage('Ftr', $row['Filename']),
            'price' => (int) $row['Sell'],
            'link' => getLink($section, $row['Internal ID']),
            'category' => $row['Fossil Group'],
        ];

    }

    /**
     * Furniture
     */
    if (in_array($section, [
        'Housewares',
        'Miscellaneous',
        'Wall-mounted',
        'Wallpaper',
        'Rugs',
        'Floors',
    ])) {

        $furniture = [
            'name' => $row['Name'],
            'image' => getImage('Ftr', $row['Filename']),
            'link' => getLink($section, $row['Internal ID']),
            'buy_price' => (int) $row['Buy'],
            'sell_price' => (int) $row['Sell'],
            'source' => $row['Source'],
        ];

        if ($row['Variation'] !== 'NA' && $row['Variation'] !== null) {
            $furniture['variation'] = $row['Variation'];
        }

        if ($row['Body Customize'] === 'Yes') {
            $furniture['customize'] = 'Body';
        } elseif ($row['Pattern Customize'] === 'Yes') {
            $furniture['customize'] = 'Pattern';
        }

        $data['furniture'][] = $furniture;

    }

    /**
     * Recipes
     */
    if (in_array($section, [
        'Recipes',
    ])) {

        $materials = [];
        foreach (range(1, 6) as $index) {
            $quantity = $row["#$index"];
            $material = $row["Material $index"];
            if (!empty($quantity) && !empty($material)) {
                $materials[] = "${quantity}x $material";
                $craftingMaterials[$material] = true;
            }
        }
        $materials = implode(', ', $materials);

        $data['recipes'][] = [
            'name' => $row['Name'],
            'link' => getLink($section, $row['Internal ID']),
            'image' => getImage('DIYRecipe', $row['DIY Icon Filename']),
            'materials' => $materials,
            'source' => $row['Source'],
            'price' => (int) $row['Sell'],
            'category' => $row['Category'],
        ];

    }

    /**
     * Sea Creatures
     */
    if (in_array($section, [
        'Sea Creatures',
    ])) {

        [$hours, $months] = getAvailability($row);

        $data['seacreatures'][] = [
            'name' => $row['Name'],
            'image' => getImage('Menu', $row['Icon Filename']),
            'price' => (int) $row['Sell'],
            'location' => 'Sea',
            'shadow' => $row['Shadow'],
            'link' => getLink($section, $row['Internal ID']),
            'hours' => $hours,
            'months' => $months,
        ];

    }

    /**
     * Songs
     */
    if (in_array($section, [
        'Music',
    ])) {

        $data['songs'][] = [
            'name' => $row['Name'],
            'image' => getImage('Ftr', $row['Filename']),
            'link' => getLink($section, $row['Internal ID']),
            'request' => strpos($row['Source Notes'], 'Hidden song - only by request') !== false,
        ];

    }

    /**
     * Villagers
     */
    if (in_array($section, [
        'Villagers',
    ])) {

        $data['villagers'][] = [
            'name' => $row['Name'],
            'image' => getImage('Npc', $row['Filename']),
            'personality' => $row['Personality'],
            'species' => $row['Species'],
            'birthday' => \DateTime::createFromFormat('n/j', $row['Birthday'])->format('F j'),
            'catchphrase' => $row['Catchphrase'],
            'gender' => $row['Gender'],
            'link' => getLink($section, $row['Filename']),
        ];

    }

}
fclose($fp);

foreach (array_keys($craftingMaterials) as $material) {
    foreach ($all as $name => $row) {
        if (strcasecmp($material, $row['name']) === 0) {
            $data['crafting'][] = $row;
        }
    }
}

foreach ($files as $file) {
    file_put_contents(__DIR__ . "/../src/data/$file.json", json_encode($data[$file]));
}
