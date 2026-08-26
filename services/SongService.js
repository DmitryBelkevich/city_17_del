import SongDao from '../dao/SongDao.js';

export default class SongService {
  async getById(id) {
    const songDao = new SongDao();
    
    const song = await songDao.getById(id);

    console.log(song);
    // fill fields
    
    return song;
  }
}
