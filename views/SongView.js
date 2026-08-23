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
    this.setTuning();
    this.setText();
  }
  
  setPageTitle() {
    document.title = this.#song.band + " - " + this.#song.title;
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

  setTuning() {
    if (!this.#song.tuning)
      this.#song.tuning = ["E", "A", "D", "G", "B", "E"];
    
    var tuningTitle;

    // standards
    if (this.#song.tuning[0] == "E" && this.#song.tuning[1] == "A")//0
      tuningTitle = "Standard E";

    if (this.#song.tuning[0] == "D#" && this.#song.tuning[1] == "G#")//-1
      tuningTitle = "Standard D#";

    if (this.#song.tuning[0] == "D" && this.#song.tuning[1] == "G")//-2
      tuningTitle = "Standard D";

    if (this.#song.tuning[0] == "C#" && this.#song.tuning[1] == "F#")//-3
      tuningTitle = "Standard C#";
    
    // drops
    if (this.#song.tuning[0] == "D" && this.#song.tuning[1] == "A")//0
      tuningTitle = "Drop D";

    if (this.#song.tuning[0] == "C#" && this.#song.tuning[1] == "G#")//-1
      tuningTitle = "Drop C#";

    if (this.#song.tuning[0] == "C" && this.#song.tuning[1] == "G")//-2
      tuningTitle = "Drop C";

    if (this.#song.tuning[0] == "B" && this.#song.tuning[1] == "F#")//-3
      tuningTitle = "Drop B";

    const element = document.getElementById("tuning");

    if (this.#song.tuning[0] == "E" && this.#song.tuning[1] == "A")
      element.style.color = "green";
    else
      element.style.color = "red";
    
    element.innerHTML = "Guitar tuning: " + tuningTitle +" [" + this.#song.tuning + "]";
  }
  
  setDisplay() {
    const element = document.getElementById("display");
    element.innerHTML = this.#song.getVoice(0) + " " + this.#song.getInstrument(0);
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
  
  async setText() {
    // Fetch the external HTML file
    const data = await this.loadData(this.#song.text);
    
    const element = document.getElementById("text");
    element.innerHTML = data;
  }
  
  async loadData(path) {
    const storage = "https://dmitrybelkevich.github.io/city_17/storage/";
    
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
