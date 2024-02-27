#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER micado WITH PASSWORD 'micado';
	CREATE DATABASE micado;
	GRANT ALL PRIVILEGES ON DATABASE micado TO micado;
	ALTER DATABASE micado OWNER TO micado;
	GRANT ALL ON SCHEMA public TO micado;

EOSQL
