var should = require('should');
var assert = require('assert');
var request = require('supertest');
// var mongoose = require('mongoose');
// var winston = require('winston');
// var config = require('./config-debug');

describe('Routing: test_error', function () {
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


    describe('Error', function () {
        it('should return 10 errors', function (done) {

            // We do this using the request object, requiring supertest!
            request(url).get('/error')
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.body.length.should.equal(10);
                    res.status.should.be.equal(200);
                    done();
                });
        });
        it('should correctly get an existing error by ID', function (done) {

            request(url)
                .get('/XAuftragExt?EOID=XDM000000117029')
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Should.js fluent syntax applied TO_NR:"208111243010", TBL:"X_AUFTRAG_EXT"
                    res.body.length.should.equal(1);
                    res.body[0].should.have.property('EO_ID');
                    res.body[0].TO_NR.should.equal('208111243010');
                    res.body[0].TBL.should.equal('X_AUFTRAG_EXT');
                    res.body[0].TS_CREATED.should.not.equal(null);

                    done();
                });
        });
    });

});