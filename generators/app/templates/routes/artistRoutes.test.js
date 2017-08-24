const expect = require('chai').expect;
const supertest = require('supertest');
const Artist = require('../models/artistModel');

const api = supertest('localhost:3002/artists');

describe('Artists Routes', () => {
  describe('INDEX ROUTE', () => {
    it('should return a 200 response', done => {
      api.get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
    });
    it('should return 10 artists each having a name', done => {
      api.get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(err).to.equal(null);
        const artists = res.body;
        expect(artists).to.not.equal(null);
        expect(artists).to.be.instanceof(Array);
        expect(artists.length).to.equal(10);
        artists.forEach(artist => {
          expect(artist).to.have.property('name');
        });
        const names = artists.map(artist => artist.name);
        expect(names).to.include('A Tribe Called Quest');
        expect(names).to.include('Fleet Foxes');
        done();
      });
    });
  });
  describe('SHOW ROUTE', () => {
    it('should return a 200 response and return A Tribe Called Quest when given the id', done => {
      // first lookup the id for A Tribe Called Quest
      Artist.where({ name: 'A Tribe Called Quest' }).fetch().then(tribe => {
        // now use the id to request the artist via the RESTful route
        const id = tribe.id;
        api.get(`/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          const artist = res.body;
          expect(artist).to.not.equal(null);
          expect(artist).to.have.property('name').that.equals('A Tribe Called Quest');
          done();
        });
      });
    });
  });
  describe('CREATE ROUTE', () => {
    it('should return a 201 response and return the new artist', done => {
      api.post('/')
      .set('Accept', 'application/json')
      .send({ name: 'New Artist' })
      .expect(201)
      .end((err, res) => {
        const artist = res.body;
        expect(artist).to.not.equal(null);
        expect(artist).to.have.property('name').that.equals('New Artist');
        done();
      });
    });
  });
});
