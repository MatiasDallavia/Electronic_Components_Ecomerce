#!/bin/bash

echo "######################"
echo "Loading products to DB"
sleep 10

pg_restore -U postgres -d electronic_components_db -v /products.tar
