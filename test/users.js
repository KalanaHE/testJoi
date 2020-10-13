const { request } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe("Users API", () => {
  //Test the GET /users endpoint
  describe("GET all users endpoint", async () => {
    await it("It should return all the users", (done) => {
      chai
        .request("http://localhost:4000")
        .get("/users")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.be.a("array").that.is.not.empty;
          done();
        });
    });
  });

  //Test the GET /users endpoint
  describe("GET all users endpoint (invalid URI)", async () => {
    await it("It should return 404", (done) => {
      chai
        .request("http://localhost:4000")
        .get("/user")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  //Test the POST /users/adduser endpoint
  describe("POST Add new user endpoint", async () => {
    const user = {
      name: "Kalana",
      email: "kalana@immunify.me",
      age: 20,
    };
    await it("It should return 200", (done) => {
      chai
        .request("http://localhost:4000")
        .post("/users/adduser")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.be.a("object").that.is.not.empty;
          response.body.should.not.have.a.property("errors");
          response.body.data.should.have.a.property("name");
          response.body.data.should.have.a.property("email");
          response.body.data.should.have.a.property("age");
          done();
        });
    });
  });

  //Test the POST /users/adduser endpoint
  describe("POST Add new user endpoint (with invald data)", async () => {
    const user = {
      name: "",
      email: "kalanaimmunify.me",
      age: "2s",
    };
    await it("It should return 400", (done) => {
      chai
        .request("http://localhost:4000")
        .post("/users/adduser")
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.errors.should.be.a("array").that.is.not.empty;
          done();
        });
    });
  });

  //Test the POST /users/adduser endpoint
  describe("POST Add new user endpoint (invald URI)", async () => {
    const user = {
      name: "kalanahe",
      email: "kalana@immunify.me",
      age: 24,
    };
    await it("It should return 404", (done) => {
      chai
        .request("http://localhost:4000")
        .post("/users/adduse")
        .send(user)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  //Test the PATCH /users/updateuser endpoint
  describe("PATCH Update a user endpoint", async () => {
    const user = {
      name: "kalanahe",
      email: "kalana@immunify.me",
      age: 24,
    };
    await it("It should return 200", (done) => {
      chai
        .request("http://localhost:4000")
        .patch("/users/updateuser/5f85782934f859fa56f773aa")
        .send(user)
        .end((err, response) => {
          response.should.have.status(200);
          //   response.body.data.should.be.a("object").that.is.not.empty;
          done();
        });
    });
  });

  //Test the PATCH /users/updateuser endpoint
  describe("PATCH Update a user endpoint (invalid data)", async () => {
    const user = {
      name: "",
      email: "kalanaimmunify.me",
      age: "24t",
    };
    await it("It should return 400", (done) => {
      chai
        .request("http://localhost:4000")
        .patch("/users/updateuser/5f85782934f859fa56f773aa")
        .send(user)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.errors.should.be.a("array").that.is.not.empty;
          done();
        });
    });
  });

  //Test the DELETE /users/deleteuser endpoint
  describe("DELETE delete a user endpoint", async () => {
    await it("It should return 200", (done) => {
      chai
        .request("http://localhost:4000")
        .delete("/users/deleteuser/5f85739ffe9dedf3b21ae31a")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.be.a("object").that.is.not.empty;
          response.body.data.should.have.a.property("deletedCount").eq(1);
          done();
        });
    });
  });

  //Test the DELETE /users/deleteuser endpoint
  describe("DELETE delete a user endpoint (user id not found)", async () => {
    await it("It should return 200", (done) => {
      chai
        .request("http://localhost:4000")
        .delete("/users/deleteuser/5f85782934f859fa56f773aa")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.be.a("object").that.is.not.empty;
          response.body.data.should.have.a.property("deletedCount").eq(0);
          done();
        });
    });
  });
});
