const chai = require("chai");
const chaiHttp = require("chai-http");
const reques = require("supertest");
const service = require("../app");
var app = reques.agent(service);

//assertion style
chai.should();

chai.use(chaiHttp);
describe("Get Request", () => {
  // test the get rout of services
  describe("Get all services", () => {
    it("Get all services", (done) => {
      app.get("/services/").end((err, response) => {
        if (err) {
          console.log("ERRRRRRR" + err);
        } else {
          response.should.have.status(200);
          response.body.should.be.an("array");
          response.body.should.not.be.empty;
          done();
        }
      });
    });
  });
});
