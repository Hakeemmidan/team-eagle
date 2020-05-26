const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../app');

chai.should();
chai.use(chaiHttp);

const expect = chai.expect;

describe('GET /users/:userId/friends', () => {
  before((done) => {
    let user = {
      email: 'seedEmail1@gmail.com',
      password: '12345678',
    };

    chai
      .request(app)
      .post('/auth/login')
      .send(user)
      .end((err, res) => {
        this.loggedInUser = res.body;
        this.cookie = res.headers['set-cookie'].find((el) =>
          el.includes('jwt=')
        );
        done();
      });
  });

  context('When request author is logged in', () => {
    before((done) => {
      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends`)
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it returns a list of friends in an array', () => {
      expect(this.response.body.friends).to.be.an('array');
    });
  });

  context('When request author is not logged in', () => {
    before((done) => {
      chai
        .request(app)
        .delete('/auth/logout')
        .set('Cookie', this.cookie)
        .end(() => {});

      chai
        .request(app)
        .get(`/users/${this.loggedInUser._id}/friends`)
        .set('Cookie', this.cookie)
        .end((err, res) => {
          this.response = res;
          done();
        });
    });

    it('it returns 200 status code', () => {
      this.response.should.have.status(200);
    });

    it('it returns a list of friends of requested id in an array', () => {
      expect(this.response.body.friends).to.be.an('array');
    });
  });
});

/******************************************************************************/

// describe('GET /users/:userId/friends/suggestions', () => {
//   context('When request author is logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 200 status code', () => {
//       this.response.should.have.status(200);
//     });

//     it('it returns a list of friends in an array', () => {
//       // expect response to have a list of friends in an array
//     });
//   });

//   context('When request author is not logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 401 status code', () => {
//       this.response.should.have.status(401);
//     });
//   });
// });

// /******************************************************************************/

// describe('POST /users/:userId/friends/follow', () => {
//   context('When request author is logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 200 status code', () => {
//       this.response.should.have.status(200);
//     });

//     it('it adds followee id to friendIds', () => {
//       // check that current user friendIds include the one just followed
//     });
//   });

//   context('When request author is not logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 401 status code', () => {
//       this.response.should.have.status(401);
//     });
//   });
// });

// /******************************************************************************/

// describe('DELETE /users/:userId/friends/follow', () => {
//   context('When request author is logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 200 status code', () => {
//       this.response.should.have.status(200);
//     });

//     it("it removes followee id from friendIds (if it's there)", () => {
//       // check that current user friendIds doesn't include the one just unfollowed
//     });

//     it("it doesn't allow you to unfollow someone you already unfollowed", () => {
//       // make API request to unfollow person just unfollowed
//       // expect response to be 401
//     });
//   });

//   context('When request author is not logged in', () => {
//     before(() => {
//       // do api call here;
//     });

//     it('it returns 401 status code', () => {
//       this.response.should.have.status(401);
//     });
//   });
// });
