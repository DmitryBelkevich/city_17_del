import Song from '../models/Song.js';

export default class SongDao {
  async loadData() {
    const path = '../../database/songs.json';
    
    try {
      // 1. Wait for the server headers and response status
      const response = await fetch(path);
      
      // 2. Check if the HTTP status code is successful (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // 3. Wait for the full body data to download and parse as JSON
      const data = await response.json();
      
      return data;
    } catch (error) {
      // 4. Handle network errors or parsing issues
      console.error('Fetch failed:', error);
    }
  }

  async getAll() {
    const data = await this.loadData();
    // return array Song()
  }

  async getById(id) {
    const data = await this.loadData();
    const result = data.find(song => song.id == id) || null;

    if (!result)
      return null;

    const song = new Song();
    
    song.id = result.id;
    song.band = result.band;
    song.title = result.title;
    song.text = result.text;
    song.score = result.score;
    song.playback = result.playback;

    if (result.voices)
      song.voices = result.voices;

    if (result.instruments)
      song.instruments = result.instruments;
    
    return song;
  }
}
