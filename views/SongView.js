export default class SongView {
  #song;
  
  set song(song) {
    this.#song = song;
  }
  
  create() {
    this.setPageTitle();
    
    this.setDisplay();
    this.setTitle();
    this.setTabs();
    this.setSettings();
    this.setTuning();
    this.setText();
  }
  
  setPageTitle() {
    document.title = this.#song.band + " - " + this.#song.title;
  }

  setDisplay() {
    const element = document.getElementById("display");
  }

  setTitle() {
    const element = document.getElementById("title");
    
    const element_h1 = document.createElement('h1');
    element_h1.textContent = this.#song.title;
    element.append(element_h1);
    
    const element_h2 = document.createElement('h2');
    element_h2.textContent = this.#song.band;
    element.append(element_h2);
  }

  setTabs() {
    document.getElementById("tab_text").addEventListener("click", () => {
      console.log("open text tab");
    });
    
    document.getElementById("tab_score").addEventListener("click", () => {
      if (!this.#song.score)
        return;
      
      window.open(this.#song.score, "_blank");
    });
    
    document.getElementById("tab_playback").addEventListener("click", () => {
      if (!this.#song.playback)
        return;
      
      window.open(this.#song.playback, "_blank");
    });
  }

  setSettings() {
    const element = document.getElementById("settings");

    // var voice = this.#song.voices[0];
    // var instrument = this.#song.instruments[1].title;
    
    // element.innerHTML = voice + " " + instrument;
  }

  setTuning() {
    const element = document.getElementById("tuning");

    this.#song.instruments.forEach((instrument, index) => {
      // if (!instrument.tuning) {
      //   if (instrument.title == "Gutar")
      //     instrument.tuning = ["E", "A", "D", "G", "B", "E"];
        
      //   if (instrument.title == "Bass Guitar")
      //     instrument.tuning = ["E", "A", "D", "G"];
      // }

      // if (!instrument.capo)
      //   instrument.capo = 0;
    }

    this.#song.instruments.forEach((instrument, index) => {
      const div_inst_tuning = document.createElement('div');

      div_inst_tuning.id = instrument.title.replaceAll(' ', '-') + "-tuning";
      
      const str = instrument.title + " tuning: " + this.getTitle(instrument.tuning) + " [" + instrument.tuning + "]";
      div_inst_tuning.textContent = str;

      const color = this.getColor(instrument.tuning);
      div_inst_tuning.style.color = color;
      
      element.append(div_inst_tuning);
      
      if (instrument.capo) {
        const element_div_capo = document.createElement('div');
        const capo = "Capo: +" + instrument.capo;console.log(capo);

        element_div_capo.textContent = capo;
        element_div_capo.style.color = "red";
        div_inst_tuning.append(element_div_capo);
      }
    });
  }
  
  async setText() {
    // Fetch the external HTML file
    const data = await this.loadData(this.#song.text);
    
    const element = document.getElementById("text");
    element.innerHTML = data;
  }
  
  async loadData(path) {
    const storage = "https://dmitrybelkevich.github.io/city_17/storage/Text & Chords/";
    
    try {
      // 1. Wait for the server headers and response status
      const response = await fetch(storage + path);
      
      // 2. Check if the HTTP status code is successful (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // 3. Wait for the full body data to download and parse as text
      const data = await response.text();
      
      return data;
    } catch (error) {
      // 4. Handle network errors or parsing issues
      console.error('Fetch failed:', error);
    }
  }

  getTitle(tuning) {
    const isEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
    
    // *** Guitars ***
    
    // standards
    if (isEqual(tuning, ["E", "A", "D", "G", "B", "E"]))//0
      return "Standard E";

    if (isEqual(tuning, ["D#", "G#", "C#", "F#", "A#", "D#"]))//-1
      return "Standard D#";

    if (isEqual(tuning, ["D", "G", "C", "F", "A", "D"]))//-2
      return "Standard D";

    if (isEqual(tuning, ["C#", "F#", "B", "E", "G#", "C#"]))//-3
      return "Standard C#";
    
    // drops
    if (isEqual(tuning, ["D", "A", "D", "G", "B", "E"]))//0
      return "Drop D";

    if (isEqual(tuning, ["C#", "G#", "C#", "F#", "A#", "D#"]))//-1
      return "Drop C#";

    if (isEqual(tuning, ["C", "G", "C", "F", "A", "D"]))//-2
      return "Drop C";

    if (isEqual(tuning, ["B", "F#", "B", "E", "G#", "C#"]))//-3
      return "Drop B";

    // *** Bass Guitars ***

    // standards
    if (isEqual(tuning, ["E", "A", "D", "G"]))//0
      return "Standard E";

    if (isEqual(tuning, ["D#", "G#", "C#", "F#"]))//-1
      return "Standard D#";

    if (isEqual(tuning, ["D", "G", "C", "F"]))//-2
      return "Standard D";

    if (isEqual(tuning, ["C#", "F#", "B", "E"]))//-3
      return "Standard C#";

    // drops
    if (isEqual(tuning, ["D", "A", "D", "G"]))//0
      return "Drop D";

    if (isEqual(tuning, ["C#", "G#", "C#", "F#"]))//-1
      return "Drop C#";

    if (isEqual(tuning, ["C", "G", "C", "F"]))//-2
      return "Drop C";

    if (isEqual(tuning, ["B", "F#", "B", "E"]))//-3
      return "Drop B";

    // *** 5-strings Bass Guitars ***

    if (isEqual(tuning, ["B", "E", "A", "D", "G"]))//0
      return "Standard E";

    if (isEqual(tuning, ["D#", "D#", "G#", "C#", "F#", "A#"]))//-1
      return "Standard D#";

    if (isEqual(tuning, ["A", "D", "G", "C", "F"]))//-2
      return "Standard D";

    if (isEqual(tuning, ["G#", "C#", "F#", "B", "E"]))//-3
      return "Standard C#";
  }
  
  getColor(tuning) {
    const isEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
    
    // *** Guitars ***
    
    if (isEqual(tuning, ["E", "A", "D", "G", "B", "E"]))
      return "green";

    // *** Bass Guitars ***
    
    if (isEqual(tuning, ["E", "A", "D", "G"]))
      return "green";

    // *** 5-strings Bass Guitars ***
    
    if (isEqual(tuning, ["B", "E", "A", "D", "G"]))
      return "green";
    
    return "red";
  }
}
