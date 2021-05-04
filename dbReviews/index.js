const postgres = require('postgres');

const sql = postgres('postgres://username:password@host:port/database', {
  host: 'localhost',
  port: 3000,
  path: '/tmp',
  password: 'password',
  database: 'SDC'


})