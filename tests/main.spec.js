import { expect } from 'chai';
import { search, searchAlbuns, searchArtists, searchTracks, searchPlayLists } from '../src/main';


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
});
