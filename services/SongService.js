import SongDao from '../dao/SongDao.js';

export default class SongService {
  #songDao = new SongDao();
  
  async getById(id) {
    const song = await this.#songDao.getById(id);

    song.instruments.forEach((instrument, index) => {
      if (instrument.title == "Guitar")
        if (!instrument.tuning)
          instrument.tuning = ["E", "A", "D", "G", "B", "E"];

      if (instrument.title == "Bass Guitar")
        if (!instrument.tuning)
          instrument.tuning = ["E", "A", "D", "G"];

      if (instrument.title == "5-string Bass Guitar")
        if (!instrument.tuning)
          instrument.tuning = ["B", "E", "A", "D", "G"];

      if (instrument.title != "Keyboards")
        if (!instrument.capo)
          instrument.capo = 0;

      if (instrument.title == "Keyboards")
        if (!instrument.transposition)
          instrument.transposition = 0;
    });
    
    return song;
  }

  getFullInstrumentTitle(tuning) {
    var title;

    return title;
  }

  isStandardTuning(tuning) {
    return false;
  }
}
