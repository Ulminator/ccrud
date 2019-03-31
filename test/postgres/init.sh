#!/bin/bash

id=$(docker inspect -f {{.State.Running}} pg)

# $id can be empty if no container exists, true if container is running or, false if container is stopped
echo $id

if [[ ! -z $id && $id == true ]]; then
  echo "Postgres is running, stopping and deleting it now"
  docker kill pg
  docker rm pg
fi

if [[ ! -z $id && $id == false ]]; then
  echo "Postgres container is inactive, deleting it now"
  docker rm pg
fi

docker run -t -p 5432:5432 --name pg -d postgres:9.6
sleep 5

docker cp ./test/postgres/tables.sql pg:tables.sql
docker cp ./test/postgres/inserts.sql pg:inserts.sql

sleep 1
docker exec -d pg psql postgres -U postgres -f tables.sql
docker exec -d pg psql postgres -U postgres -f inserts.sql