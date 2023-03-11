//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

const moment = require('moment');
const format = require('../src/config/format');
const { assert } = require('chai');
moment.locale('id');

chai.use(chaiHttp);

describe('Scraps', () => {
    describe('/POST scraps tribunnews', () => {
        let params = {
            "url": "https://www.tribunnews.com/metropolitan/2023/03/04/sabtu-pagi-jenazah-ibu-dan-anaknya-ditemukan-dalam-posisi-berpelukan-di-bawah-reruntuhan-rumah"
        }

        it('it should Scrap the tribbun news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('tribunnews')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps kompas', () => {
        let params = {
            "url": "https://travel.kompas.com/read/2023/03/04/104916027/festival-pasir-padi-di-babel-ada-lomba-dayung-dan-tradisi-cari-kerang"
        }

        it('it should Scrap the kompas', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('kompas')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps liputan 6', () => {
        let params = {
            "url": "https://www.liputan6.com/bola/read/5224213/hasil-piala-asia-u-20-2023-suriah-vs-indonesia-garuda-muda-petik-kemenangan-berharga"
        }

        it('it should Scrap the liputan 6', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('liputan')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps tempo', () => {
        let params = {
            "url": "https://nasional.tempo.co/read/1698650/psi-dukung-kpu-ajukan-banding-atas-putusan-penundaan-pemilu"
        }

        it('it should Scrap the tempo news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('tempo')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps suara', () => {
        let params = {
            "url": "https://www.suara.com/news/2023/03/05/140750/hilang-saat-mengaji-tiga-anak-korban-kebakaran-pertamina-plumpang-kini-masih-dicari"
        }

        it('it should Scrap the suara news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('suara')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps jawapos', () => {
        let params = {
            "url": "https://www.jawapos.com/jpg-today/05/03/2023/jokowi-tiba-di-bandung-resmikan-empat-proyek-infrastruktur/"
        }

        it('it should Scrap the jawapos news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('jawapos')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps merdeka', () => {
        let params = {
            "url": "https://www.merdeka.com/peristiwa/hancur-karir-pejabat-gara-gara-pamer-harta-dan-hedon-hot-issue.html"
        }

        it('it should Scrap the merdeka news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('merdeka')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps okezone', () => {
        let params = {
            "url": "https://foto.okezone.com/view/2023/03/05/2/89791/pembalap-toprak-razgatlioglu-jadi-yang-tercepat-di-superpole-race-wsbk-2023"
        }

        it('it should Scrap the okezone news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('okezone')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps sindonews', () => {
        let params = {
            "url": "https://metro.sindonews.com/read/1038615/170/sudah-5-bulan-banjir-di-gang-cue-bekasi-ini-tak-pernah-surut-1677974638"
        }

        it('it should Scrap the sindonews news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('sindonews')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

    describe('/POST scraps kontan', () => {
        let params = {
            "url": "https://internasional.kontan.co.id/news/saham-perusahaan-adani-melonjak-setelah-investasi-senilai-us-187-miliar-dari-gqg"
        }

        it('it should Scrap the kontan news', (done) => {
            chai.request(server)
                .post('/scraps')
                .send(params)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('media').eql('kontan')
                    assert.equal(moment(res.body.time, format.timeFormat(), true).isValid(), true)
                    assert.notEqual(res.body.title, "")
                    assert.notEqual(res.body.content, "")
                    done();
                });
        });
    });

});