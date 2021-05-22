// Import dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index.js");
const expect = chai.expect;
chai.use(chaiHttp);

// Test data
const userData = {
  username: 'a',
  password: 'a'
};
const userTweetData = {
  message: "Test Message"
}
const userMessageData = {
  message: "Test Message"
}

// Unit tests
describe("Account Testing", function () {
  this.timeout(5000);
  /* Users */
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
      userData.user_id = res.body.user_id;
      userData.accessToken = res.body.accessToken;
      done();
    });
  });
  /* Tweets */
  it("Create tweet", (done) => {
    chai.request(server)
    .post("/api/tweets/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .send(userTweetData)
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to create tweet.');
      userData.tweet = res.body;
      done();
    });
  });
  it("Get all tweets", (done) => {
    chai.request(server)
    .get("/api/tweets/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to get all tweets.');
      done();
    });
  });
  it("Update a tweet", (done) => {
    chai.request(server)
    .put("/api/tweets/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .send({ tweet_id: userData.tweet.tweet_id, message: 'New Tweet Message After Updating' })
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to update tweet.');
      done();
    });
  });
  it("Delete a tweet", (done) => {
    chai.request(server)
    .put("/api/tweets/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .send({ tweet_id: userData.tweet.tweet_id })
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to delete tweet.');
      done();
    });
  });
  /* Messages */
  it("Create message", (done) => {
    chai.request(server)
    .post("/api/messages/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .send({ recipient_user_id: userData.user_id, message: userMessageData.message })
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to create message.');
      userData.message = res.body;
      done();
    });
  });
  it("Get all messages", (done) => {
    chai.request(server)
    .get("/api/messages/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to get all messages.');
      done();
    });
  });
  it("Update a message", (done) => {
    chai.request(server)
    .put("/api/messages/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .send({ message_id: userData.message.message_id, message: 'New Message After Updating' })
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to update message.');
      done();
    });
  });
  it("Delete a message", (done) => {
    chai.request(server)
    .put("/api/messages/")
    .set('content-type', 'application/x-www-form-urlencoded')
    .set('x-access-token', userData.accessToken)
    .send({ message_id: userData.message.message_id })
    .end(function (err, res) {
      if (err) done(err);
      expect(res.text).to.not.equal('Failed to delete message.');
      done();
    });
  });
});