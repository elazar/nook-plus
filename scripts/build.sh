#!/bin/bash -x

docker-compose run -e NODE_ENV=production yarn build
