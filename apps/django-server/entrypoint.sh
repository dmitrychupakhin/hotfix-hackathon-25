#!/bin/sh

python manage.py makemigrations users
python manage.py makemigrations orders
python manage.py makemigrations teams
python manage.py makemigrations predictors
python manage.py migrate
python manage.py collectstatic --noinput

exec "$@"
