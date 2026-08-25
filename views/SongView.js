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
    this.#song.instruments.forEach((instrument, index) => {
      // console.log(`${index}: ${instrument}`);
      console.log(instrument);
      console.log(instrument.title + " tuning: " + getTitle(instrument.tuning) + " " + instrument.tuning);
    });
    
    if (!this.#song.tuning)
      this.#song.tuning = ["E", "A", "D", "G", "B", "E"];
    
    function getTitle(tuning) {
      const isEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);

      // (6-str) standards
      if (isEqual = (tuning, ["E", "A", "D", "G", "B", "E"]))//0
        return "Standard E";

      if (isEqual = (tuning, ["D#", "G#", "C#", "F#", "A#", "D#"]))//-1
        return "Standard D#";
  
      if (isEqual = (tuning, ["D", "G", "C", "F", "A", "D"]))//-2
        return "Standard D";
  
      if (isEqual = (tuning, ["C#", "F#", "B", "E", "G#", "C#"]))//-3
        return "Standard C#";
      
      // standards
      // if (tuning[0] == "E" && tuning[1] == "A")//0
        // return "Standard E";
  
      // if (tuning[0] == "D#" && tuning[1] == "G#")//-1
      //   return "Standard D#";
  
      // if (tuning[0] == "D" && tuning[1] == "G")//-2
      //   return "Standard D";
  
      // if (tuning[0] == "C#" && tuning[1] == "F#")//-3
      //   return "Standard C#";
      
      // (6-str) drops
      if (isEqual = (tuning, ["D", "A", "D", "G", "B", "E"]))//0
        return "Drop D";

      if (isEqual = (tuning, ["C#", "G#", "C#", "F#", "A#", "D#"]))//-1
        return "Drop C#";
  
      if (isEqual = (tuning, ["C", "G", "C", "F", "A", "D"]))//-2
        return "Drop C";
  
      if (isEqual = (tuning, ["B", "F#", "B", "E", "G#", "C#"]))//-3
        return "Drop B";
      
      // if (tuning[0] == "D" && tuning[1] == "A")//0
      //   return "Drop D";
  
      // if (tuning[0] == "C#" && tuning[1] == "G#")//-1
      //   return "Drop C#";
  
      // if (tuning[0] == "C" && tuning[1] == "G")//-2
      //   return "Drop C";
  
      // if (tuning[0] == "B" && tuning[1] == "F#")//-3
      //   return "Drop B";
    }

    function getColor(tuning) {
      if (tuning[0] == "E" && tuning[1] == "A")
        return "green";
      
      return "red";
    }

    var title = getTitle(this.#song.tuning);
    var color = getColor(this.#song.tuning);
    
    const element = document.getElementById("tuning");
    
    element.style.color = color;
    element.innerHTML = "Guitar tuning: " + title +" [" + this.#song.tuning + "]";
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
}
