import Song from '../../../models/Song.js';
import SongDao from '../../../dao/SongDao.js';
import SongView from '../../../views/SongView.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

async function main() {console.log(id);
  try {
    // model
    const songDao = new SongDao();
    const song = await songDao.getById(id);

    // view
    const songView = new SongView();
    songView.song = song;

    songView.create();
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

main();
