docker volume create pgdata
docker run --name postgres_openmls_poc_db -e POSTGRES_PASSWORD=zxasqw123 -e POSTGRES_USER=postgres -p 5432:5432 -v pgdata:/var/lib/postgresql/data -d postgres