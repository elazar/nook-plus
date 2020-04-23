#!/bin/bash -x

for d in 48 72 96 144 168 192; do
    docker-compose run imagemagick convert homescreen.png -resize ${d}x${d} build/images/touch/homescreen${d}.png;
done

docker-compose run imagemagick convert homescreen.png -background none -resize 128x128 -density 128x128 build/favicon.ico

# https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
# https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/#app-icon-sizes
for d in 180 120 167 152 719; do
    docker-compose run imagemagick convert homescreen.png -resize ${d}x${d} -flatten build/images/touch/apple-touch-icon-${d}.png;
done
