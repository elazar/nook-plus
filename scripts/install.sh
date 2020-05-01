#!/bin/bash -x

docker-compose run composer install

docker-compose run yarn install --production=false
