export default class MutantsManager {
  constructor(personsRepository) {
    this.personsRepository = personsRepository;

    this.save = this.save.bind(this);
    this.checkIfNewDna = this.checkIfNewDna.bind(this);
  }

  save(dna, isMutant) {
    return this.personsRepository.getByDna(dna)
      .then(person => {
        if (person == null) {
          var person = {
            dna,
            isMutant
          }

          return this.personsRepository.add(person);
        }
      });
  }

  checkIfNewDna(dna) {
    return this.personsRepository.getByDna(dna)
      .then(person => {
        return person == null;
      });
  }
}