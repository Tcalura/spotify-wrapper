import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
// import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
// sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlayLists } from '../src/search';
import { FetchError } from 'node-fetch';


describe('Search', () => {

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
      expect(searchAlbums).to.exist;
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

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });


  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=tracks');

      const albums2 = searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=tracks');
    });
  });

  describe('searchPlayLists', () => {
    it('should call fetch function', () => {
      const playlist = searchPlayLists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlist = searchPlayLists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlist2 = searchPlayLists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });

});
