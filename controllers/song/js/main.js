import SongService from '../../../services/SongService.js';
import SongView from '../../../views/SongView.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

async function main() {
  try {
    // model
    const songService = new SongService();
    const song = await songService.getById(id);

    // view
    const songView = new SongView();
    songView.song = song;

    songView.create();
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

main();
