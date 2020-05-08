#!/bin/bash -x

for data in bugs clothing crafting fish fossils furniture recipes songs villagers; do
    docker-compose run php scripts/images.php src/data/$data.json build/images/$data;
done
