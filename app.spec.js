const app = require('./app');
const request = require('supertest');

describe('GET /test는', () => {
    it('json을 리턴한다.', (done) => {
        request(app)
            .get('/test')
            .expect('Content-Type', /json/)
            //.expect('Context-Length', '17')
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