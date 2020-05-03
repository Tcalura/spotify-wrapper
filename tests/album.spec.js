import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Abum', () => {

  let stubedFecth;
  let promise;

  beforeEach(() => {
    stubedFecth = sinon.stub(global, 'fetch');
    promise = stubedFecth.returnsPromise();
  });

  afterEach(() => {
    stubedFecth.restore();
  });


  describe('smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });


  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFecth).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFecth).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(stubedFecth).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'});
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFecth).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTy']);
      expect(stubedFecth).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTk,4aawyAB9vmqN3uQ7FjRGTy');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({album: 'name'});
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTy']);

      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubedFecth).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFecth).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');

      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });


});


