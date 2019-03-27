var app = require('../server/app');
var request = require('supertest')(app.listen());
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('admin测试', function () {

  it('登录', function (done) {
    this.timeout(20000);
    var filter = {
      'uname':'root',
      'upwd':'123'
    };
    request.post('/admin/login')
      .set({'Content-Type': 'application/json'})
      .send(filter)
      .end(function (err, res) {
        console.log(JSON.stringify(res.body));
        expect(res.status).to.equal(200);
        done()
      });
  });


  it('添加IntentMapping', function (done) {
    this.timeout(20000);
    var filter = {
      mp_key:'b_intent',
      mp_params:{
        xxx:'',
        xxx:'',
      }
    };
    request.post('/sales/api/system/newList')
      .set({'Content-Type': 'application/json'})
      .send(filter)
      .end(function (err, res) {
        console.log(JSON.stringify(res.body));
        expect(res.status).to.equal(200);
        done()
      });
  });
  it('搜索品牌', function (done) {
    this.timeout(20000);
    request.get('/api/resource/brands')
      .set({'Content-Type': 'application/json'})
      .send()
      .end(function (err, res) {
        console.log(res.body);
        expect(res.status).to.equal(200);
        done();
      });

  });
  it('搜索车系', function (done) {
    this.timeout(20000);
    request.get('/api/resource/brands/559935e940541feb2e2dea48')
      .set({'Content-Type': 'application/json'})
      .send()
      .end(function (err, res) {
        console.log(res.body);
        expect(res.status).to.equal(200);
        done();
      });

  });

});
