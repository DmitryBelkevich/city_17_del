export default class SongView { 
  create() {
    this.setDisplay();
    this.setSettings();
    this.setTuning();
  }

  setDisplay() {
    const element = document.getElementById("display");
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
      const div_inst_tuning = document.createElement('div');

      div_inst_tuning.id = instrument.title.replaceAll(' ', '-') + "-tuning";

      const title = this.getTitle(instrument.tuning);
      
      const str = instrument.title + " tuning: " + title + " [" + instrument.tuning + "]";
      div_inst_tuning.textContent = str;

      const color = this.getColor(instrument.tuning);
      div_inst_tuning.style.color = color;
      
      element.append(div_inst_tuning);
      
      if (instrument.capo) {
        const element_div_capo = document.createElement('div');
        const capo = "Capo: +" + instrument.capo;

        element_div_capo.textContent = capo;
        element_div_capo.classList.add("capo");;
        div_inst_tuning.append(element_div_capo);
      }

      if (instrument.transposition) {
        console.log("set transposition: " + instrument.transposition);
      }
    });
  }
}
