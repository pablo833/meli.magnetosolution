export default class MutantDnaAnalyzer {
  constructor() {
    this.isMutant = this.isMutant.bind(this);
    this.isValidDna = this.isValidDna.bind(this);
    this.DnaHasValidBase = this.DnaHasValidBase.bind(this);
    this._getSeekCriteria = this._getSeekCriteria.bind(this);
    this._seek = this._seek.bind(this);
    this._seekDown = this._seekDown.bind(this);
    this._seekCross = this._seekCross.bind(this);
    this._seekCrossDownForward = this._seekCrossDownForward.bind(this);
    this._seekCrossDownBackward = this._seekCrossDownBackward.bind(this);
  }

  isMutant(dna) {
    if (!this.isValidDna(dna)) {
      throw new Error('Invalid dna.');
    }

    if (dna.length < 4) {
      return false;
    }

    var matches = 0;

    for (var line = 0; line < dna.length; line++) {
      for (var col = 0; col < dna.length; col++) {
        var criteria = this._getSeekCriteria(line, col, dna.length);

        if (line === (dna.length - 1) && col > ((dna.length - 1) - 4)) {
          return false;
        }

        matches = this._seek(dna, line, col, criteria, matches);

        if (matches > 1) {
          return true;
        }
      }
    }

    return false;
  }

  isValidDna(dna) {
    if (!Array.isArray(dna)) {
      return false;
    }

    if (!dna.every(seq => (typeof seq === 'string' || seq instanceof String))) {
      return false;
    }

    if (!dna.every(seq => seq.length === dna.length)) {
      return false;
    }

    if (!this.DnaHasValidBase(dna)) {
      return false;
    }

    return true;
  }

  DnaHasValidBase(dna) {
    var isaValidBase = true;
    const baseA = 'A';
    const baseC = 'C';
    const baseG = 'G';
    const baseT = 'T';

    for (let i = 0; i < dna.length; i++) {
      const row = dna[i].split('');

      if (!row.every(base => (base === baseA || base === baseC || base === baseG || base === baseT))) {
        isaValidBase = false;
        break;
      }

      if (!isaValidBase) {
        break;
      }
    }
    return isaValidBase;

  }

  _getSeekCriteria(line, col, length) {
    var down = true;
    var cross = true;
    var crossDownForward = true;
    var crossDownBackward = true;

    if (line > (length - 4)) {
      down = false;
      crossDownForward = false;
      crossDownBackward = false;
    }

    if (col < 3) {
      crossDownBackward = false;
    }

    if (col > (length - 4)) {
      cross = false;
      crossDownForward = false;
    }

    return {
      down,
      cross,
      crossDownForward,
      crossDownBackward
    }
  }

  _seek(dna, line, col, criteria, matches) {
    if (criteria.down) {
      if (this._seekDown(dna, line, col)) {
        matches++;
      }

      if (matches > 1) {
        return matches;
      }
    }

    if (criteria.cross) {
      if (this._seekCross(dna, line, col)) {
        matches++;
      }

      if (matches > 1) {
        return matches;
      }
    }

    if (criteria.crossDownForward) {
      if (this._seekCrossDownForward(dna, line, col)) {
        matches++;
      }

      if (matches > 1) {
        return matches;
      }
    }

    if (criteria.crossDownBackward) {
      if (this._seekCrossDownBackward(dna, line, col)) {
        matches++;
      }

      if (matches > 1) {
        return matches;
      }
    }

    return matches;
  }

  _seekDown(dna, line, col) {
    return dna[line][col] === dna[line + 1][col]
      && dna[line][col] === dna[line + 2][col]
      && dna[line][col] === dna[line + 3][col];
  }

  _seekCross(dna, line, col) {
    return dna[line][col] === dna[line][col + 1]
      && dna[line][col] === dna[line][col + 2]
      && dna[line][col] === dna[line][col + 3];
  }

  _seekCrossDownForward(dna, line, col) {
    return dna[line][col] === dna[line + 1][col + 1]
      && dna[line][col] === dna[line + 2][col + 2]
      && dna[line][col] === dna[line + 3][col + 3];
  }

  _seekCrossDownBackward(dna, line, col) {
    return dna[line][col] === dna[line + 1][col - 1]
      && dna[line][col] === dna[line + 2][col - 2]
      && dna[line][col] === dna[line + 3][col - 3];
  }
}
