import SongDao from '../dao/SongDao.js';

export default class SongService {
  #songDao = new SongDao();

  async getById(id) {
    const song = await this.#songDao.getById(id);
    
    // fill fields
    
    return song;
  }
}
