export default class Song {
  #id;
  #band;
  #title;
  #text;
  #score;
  #playback;
  #voices = [];
  #instruments = [];

  set id(id) {
    this.#id = id;
  }
  
  get id() {
    return this.#id;
  }
  
  set band(band) {
    this.#band = band;
  }

  get band() {
    return this.#band;
  }

  set title(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  set text(text) {
    this.#text = text;
  }

  get text() {
    return this.#text;
  }

  set score(score) {
    this.#score = score;
  }

  get score() {
    return this.#score;
  }

  set playback(playback) {
    this.#playback = playback;
  }

  get playback() {
    return this.#playback;
  }

  set voices(voices) {
    if (!voices)
      return;
    
    this.#voices = [...voices];
  }
  
  get voices() {
    return [...this.#voices];
  }

  set instruments(instruments) {
    if (!instruments)
      return;
    
    this.#instruments = [...instruments];
  }
  
  get instruments() {
    return [...this.#instruments];
  }
}
