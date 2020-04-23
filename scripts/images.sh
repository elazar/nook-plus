#!/bin/bash -x

for data in bugs fish fossils villagers; do
    docker-compose run php scripts/images.php src/data/$data.json build/images/$data;
done
