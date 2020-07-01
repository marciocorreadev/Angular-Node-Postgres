-- Executar os seguintes comandos abaixo para iniciar o projeto de forma local

### Instalar dependencias

npm i

### Iniciar a API

## Caso seja usando docker

docker run \
 --name postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_DB=Produtos \
 -p 5432:5432 \
 -d \
 postgres

npx sequelize db:migrate

## Caso seja banco postgres local

npm run pre-start

### Iniciar web

ng serve
