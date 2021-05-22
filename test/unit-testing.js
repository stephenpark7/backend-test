// Import dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");
const expect = chai.expect;
chai.use(chaiHttp);

// Test data
const userData = {
  username: 'z',
  password: 'z'
};

/* Unit tests */
describe("Account Testing", function () {
  this.timeout(5000);
  it("Create a new account", (done) => {
    chai.request(server)
    .post("/api/users/signup")
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(userData)
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.equal('Successfully created an account.');
      done();
    });
  });
  it("Log in to an account", (done) => {
    chai.request(server)
    .post("/api/users/login")
    .set('content-type', 'application/x-www-form-urlencoded')
    .send(userData)
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Missing field(s)');
      expect(res.text).to.not.equal('Username does not exist.');
      expect(res.text).to.not.equal('Incorrect password.');
      done();
    });
  });
});