import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
// import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
// sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbuns, searchArtists, searchTracks, searchPlayLists } from '../src/main';
import { FetchError } from 'node-fetch';


describe('Spotify Wrapper', () => {

  describe('smoke tests', () =>{
    // search (generico) - + de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlayLists

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlayLists method', () => {
      expect(searchPlayLists).to.exist;
    });
  });

  let fetchedStub;

  beforeEach( () => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ body: 'json' });
  });

  afterEach( () => {
    fetchedStub.restore();
  });

  describe('Generic Search', () => {

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fecth', () => {

      context('passing one type', () => {
        const artists = search('Incubus', 'artists');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artists');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

        fetchedStub.restore();
      });

      context('passing more than one type', () => {
        const fetchedStub = sinon.stub(global, 'fetch');
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');


      });
    });

    it('should return the JSON Data from then Promise', () => {
      const artists = search('Incubus', 'artist');

      console.log(artists.resolveValue);


      expect(artists.resolveValue).to.be.eql({ body: 'json' });

    });

  });
});
