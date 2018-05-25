export default class StatsManager {
  constructor(statsRepository) {
    this.statsRepository = statsRepository;

    this.get = this.get.bind(this);
    this.update = this.update.bind(this);
  }

  get() {
    return this.statsRepository.get();
  }

  update(isMutant) {
    return this.statsRepository.get()
      .then(stats => {
        if (stats == null) {
          stats = {
            count_mutant_dna: isMutant ? 1 : 0,
            count_human_dna: isMutant ? 0 : 1,
            ratio: isMutant ? 1.00 : 0
          }

          return this.statsRepository.add(stats);
        } else {
          stats.count_mutant_dna = isMutant ? stats.count_mutant_dna + 1 : stats.count_mutant_dna;
          stats.count_human_dna = !isMutant ? stats.count_human_dna + 1 : stats.count_human_dna;
          stats.ratio = parseFloat((stats.count_mutant_dna / (stats.count_mutant_dna + stats.count_human_dna)).toFixed(2));

          return this.statsRepository.update(stats);
        }
      });
  }
}