#!/bin/bash -x

for data in bugs crafting fish fossils furniture recipes villagers; do
    docker-compose run php scripts/images.php src/data/$data.json build/images/$data;
done
