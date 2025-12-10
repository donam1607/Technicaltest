const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'diemthi_user',
    password: '123456',
    database: 'diem_thi',
});

client.connect()
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error('Connection error:', err))
    .finally(() => client.end());
