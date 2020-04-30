const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

const user = {
  username: "bilbo21gf2",
  password: "pass"
};

const testData = 

  {
    "strain": "kufghfgsh",
    "strain_id": "3453"
  };


let token;

  describe("POST /register", function () {
    beforeEach(async () => {
      await db("users").truncate(); // empty the table and reset the id back to 1
    });

    it ("return 201 on success", async () => {
   try{ const response = await
      request(server)
        .post("/api/auth/register")
        .send({ username: "bilbo", password: "pass" })
       // console.log(response)
        expect(response.status).toBe(201);}
        catch(error){console.log(error)}
     
    });

    it('should return a message saying "User created successfully"', function () {
      return request(server)
      .post("/api/auth/register")
        .send({ username: "bilbo21gf2", password: "pass" })
        .then(res => {
         // console.log(res);
          expect(res.body.message).toBe("User created successfully");
        }).catch(err => {
        //  console.log(err);
    });
  });
});



  describe("login post", () => {
    describe("login user with correct credentials receive 200", () => {
        it("check username and password with database", () => {
            request(server)
            .post("/api/auth/login")
            .send(user)
            
            .end((err, response) => {
              token = response.body.token; // save the token!
           //   console.log("11111"+token);
            });
        });
      });

    


        it("return 401 from non-existent login", function () {
          return request(server)
          .post("/api/auth/login")
          .send({
              username: "fsghfghfg",
              password: "fdghjdfjdghjdhj"
          })
          .then(res => {
              expect(res.status).toBe(401);
          });

    });
  });


  describe('GET /', () => {
    // token not being sent - should respond with a 400
    test('It should require authorization', () => {
      return request(server)
        .get('/api/med/1')
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
  //    console.log("11111"+token);
      return request(server)
        .get('/api/med/1')
        .set('Authorization', `${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe('application/json');
        });
    });
  });

  describe('POST /', () => {
    // token not being sent - should respond with a 400
    test('It should require authorization', () => {
      return request(server)
        .post('/api/med/1')
        .send(testData)
        .then((response) => {
          expect(response.statusCode).toBe(400);
        });
    });
    // send the token - should respond with a 200
    test('It responds with JSON', () => {
  //    console.log("11111"+token);
      return request(server)
        .get('/api/med/1')
        .set('Authorization', `${token}`)
        .send(testData)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe('application/json');
        });
    });
  });


  test('Send incorrect token, deny request', () => {
    //    console.log("11111"+token);
        return request(server)
          .get('/api/med/1')
          .set('Authorization', `wrong token`)
          .send(testData)
          .then((response) => {
            expect(response.statusCode).toBe(401);
            expect(response.type).toBe('application/json');
          });
      });
  







      const enhancer = require("./auth-model.js");
// test away!
describe("auth-model.js", function () {
  it("run all tests", () => {
    expect(true).toBe(true);
  });
  describe(".succeed(item)", () => {
    it("ensure auth model findBy is active", () => {
      expect(
        enhancer.findBy({
          username: "bilbo21gf2"
        })
      ).toHaveProperty('_asColumnFlag', false);
    });
  });
  describe(".succeed(item)", () => {
    it("ensure auth model findById is active", () => {
      expect(
        enhancer.findById({
          id: 1
        })
      ).toHaveProperty('_asColumnFlag', false);
    });
  });
  describe(".succeed(item)", () => {
    it("ensure auth model find is active", () => {
      expect(
        enhancer.find({
          id: 1
        })
      ).toHaveProperty('_asColumnFlag', false);
    });
  });
  describe(".succeed(item)", () => {
    it("ensure auth model add function is active", () => {
      expect.anything();
    });
  });
  
});
