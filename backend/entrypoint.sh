#!/bin/sh

echo "STARTING MIGRATION: "

python manage.py makemigrations
python manage.py migrate

echo "FINISHED"


exec "$@"