#!/bin/sh

until nc -z postgres 5432; do
  echo "Waiting for database..."
  sleep 1
done

python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser --noinput

exec "$@"