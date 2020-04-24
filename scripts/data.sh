#!/bin/bash -x

for script in bugs crafting fish fossils songs villagers; do
    docker-compose run php ./scripts/$script.php > ./src/data/$script.json;
done
