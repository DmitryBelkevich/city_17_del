export default class Song {
  #id;
  #band;
  #title;
  #text;
  #score;
  #playback;
  #tuning;
  #voices = [];
  #instruments = [];
  
  get id() {
    return this.#id;
  }
  
  set id(id) {
    this.#id = id;
  }

  get band() {
    return this.#band;
  }

  set band(band) {
    this.#band = band;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    this.#title = title;
  }

  get text() {
    return this.#text;
  }

  set text(text) {
    this.#text = text;
  }

  get score() {
    return this.#score;
  }

  set score(score) {
    this.#score = score;
  }

  get playback() {
    return this.#playback;
  }

  set playback(playback) {
    this.#playback = playback;
  }

  get tuning() {
    return this.#tuning;
  }

  set tuning(tuning) {
    this.#tuning = tuning;
  }
  
  get voices() {
    return this.#voices;
  }

  set voices(voices) {
    this.#voices = voices;
  }
  
  get instruments() {
    return this.#instruments;
  }

  set instruments(instruments) {
    this.#instruments = instruments;
  }
}
