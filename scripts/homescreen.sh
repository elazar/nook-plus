#!/bin/bash -x

for d in 48 72 96 144 168 192; do
    docker-compose run imagemagick convert homescreen.png -resize ${d}x${d} build/images/touch/homescreen${d}.png;
done

docker-compose run imagemagick convert homescreen.png -background none -resize 128x128 -density 128x128 build/favicon.ico
