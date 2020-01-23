const app = require('../app');
const request = require('supertest');

describe('GET /api/download는', () => {
    it('다운로드한 파일을 리턴한다.', (done) => {
        request(app)
            .get('/api/download?path=A/engineA/engineA.pdf')
            .expect('Content-Type', 'application/pdf')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
    it('파일이 없을때 404를 반환한다. ', (done) => {
        request(app)
            .get('/api/download?path=B/uiB/uiB.pdf')
            .expect(404)
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            });
    });    
});


describe('GET /api/directory은', () => {
    it('json을 리턴한다.', (done) => {
        request(app)
            .get('/api/directory')
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
