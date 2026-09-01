export default class SongService {
  isStandardTuning(tuning) {
    const isEqual = (a, b) => a.length === b.length && a.every((val, i) => val === b[i]);
    
    // *** Guitars ***
    
    if (isEqual(tuning, ["E", "A", "D", "G", "B", "E"]))
      return true;

    // *** Bass Guitars ***
    
    if (isEqual(tuning, ["E", "A", "D", "G"]))
      return true;

    // *** 5-strings Bass Guitars ***
    
    if (isEqual(tuning, ["B", "E", "A", "D", "G"]))
      return true;
    
    return false;
  }
}
