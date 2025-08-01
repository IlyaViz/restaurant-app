#!/bin/sh

until nc -z postgres 5432; do
  echo "Waiting for database..."
  sleep 1
done

python manage.py makemigrations --noinput
python manage.py migrate --noinput

python manage.py createsuperuser --noinput

exec "$@"