# knex-test

Frameworks and Tools:
JavaScript (ES6) 

Runtime environment: Node.js 10+

Web framework: Express

Database: MySql

Database query builder: Knex (https://knexjs.org/) 

Міграція: 

- knex migrate:latest

Сіддинг: 

- knex seed:run

Запуск:

- npm i

- node server.js

### В Postman:

- (не працює) [POST] Book a table:                            http://localhost:8001/api/reservations

- (працює) [GET] View reservation with the given Id:       http://localhost:8001/api/reservations/1

- (не працює) [PUT] Update reservation with the given Id:     http://localhost:8001/api/reservations/1

- (працює) [DELETE] Cancel reservation with the given Id   http://localhost:8001/api/reservations/1

API will accept and return all data in JSON (Content-Type: application/json) 
API should return HTTP 200 or 201 (created) in case if operation is successful and 404 if no such reservation.

2 tables for 2 persons 

4 tables for 4 persons 

2 tables for 6 persons

1 tables for 8 persons 

1 table for 16 persons

There 2 business entities:

- Table 

- Reservation

