var should = require('should');
var assert = require('assert');
var request = require('supertest');
// var mongoose = require('mongoose');
// var winston = require('winston');
// var config = require('./config-debug');

describe('Routing: test_odb', function () {
    var url = 'http://localhost:3300';
    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function (done) {
        // In our tests we use the test db
        //mongoose.connect(config.db.mongodb);							
        done();
    });
    // use describe to give a title to your test suite, in this case the tile is "Account"
    // and then specify a function in which we are going to declare all the tests
    // we want to run. Each test starts with the function it() and as a first argument 
    // we have to provide a meaningful title for it, whereas as the second argument we
    // specify a function that takes a single parameter, "done", that we will use 
    // to specify when our test is completed, and that's what makes easy
    // to perform async test!
    describe('Config', function () {
        it('should get db config: ' + url, function (done) {
            // We do this using the request object, requiring supertest!
            request(url).get('/config?db_name=ET3')
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    //expect(res.text).to.be.eql('ET2');
                    // this is should.js syntax, very clear
                    res.text.should.be.equal('ET3');

                    res.status.should.be.equal(200);
                    done();
                });
        });
        it('should put db config', function (done) {
            request(url).put('/config?db_name=ET1')
                // end handles the response
                .send({
                    username: 'username@wonderflow.co',
                    password: 'password'
                })
                .end(function (err, res) {

                    //expect(res.body.token).to.be.not.undefined;
                    //expect(res.body.user).to.be.not.undefined;
                    //expect(res.text).to.be.eql('ET2');
                    res.text.should.be.equal('ET1');
                    res.status.should.be.equal(200);
                    done();
                });
        });
    });


});