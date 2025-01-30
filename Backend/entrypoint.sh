#!/bin/sh
set -e

# Wait for MySQL
until nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  sleep 1
done

exec "$@"
