import SongDao from '../dao/SongDao.js';

export default class SongService {
  async getById(id) {
    const songDao = new SongDao();
    
    const song = await songDao.getById(id);

    song.instruments.forEach((instrument, index) => {
      if (!instrument.tuning) {
        if (instrument.title == "Guitar")
          instrument.tuning = ["E", "A", "D", "G", "B", "E"];
        
        if (instrument.title == "Bass Guitar")
          instrument.tuning = ["E", "A", "D", "G"];
      }

      if (!instrument.capo)
        instrument.capo = 0;
    });

    console.log(song);
    // fill fields
    
    return song;
  }
}
