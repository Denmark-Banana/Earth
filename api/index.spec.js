const app = require('../app');
const request = require('supertest');

describe('GET /api/scan은', () => {
    it('json을 리턴한다.', (done) => {
        request(app)
            .get('/api/scan')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    done();
                    console.log(res.body);
                }
            });
    });
});