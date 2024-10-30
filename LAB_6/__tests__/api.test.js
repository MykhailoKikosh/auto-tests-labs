const request = require('supertest');

const BASE_URL = 'https://dog.ceo/api';

describe('Dog CEO API Tests', () => {
    it('Should return a random dog image', async () => {
        const response = await request(BASE_URL)
            .get('/breeds/image/random')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body.message).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\/.*\.jpg$/);
    });
});


// const request = require('supertest');
// const express = require('express');
//
// const app = express();
//
// app.get('/user', function(req, res) {
//     res.status(200).json({ name: 'john' });
// });
//
// request(app)
//     .get('/user')
//     .expect('Content-Type', /json/)
//     .expect('Content-Length', '15')
//     .expect(200)
//     .end(function(err, res) {
//         if (err) throw err;
//     });
//
// describe('GET /user', function() {
//     it('responds with json', function(done) {
//         request(app)
//             .get('/user')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });