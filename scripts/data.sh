#!/bin/bash -x

for script in bugs clothing crafting fish fossils furniture recipes songs villagers; do
    docker-compose run php ./scripts/$script.php > ./src/data/$script.json;
done
