import Genetic from 'genetic-js';

export let genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.FittestRandom;

genetic.seed = function () {
  let individual = [];
  for (let i = 0; i < this.userData['numberOfObjects']; i++) {
    individual.push(Math.round(Math.random()));
  }
  return individual;
};

genetic.crossover = function (father, mother) {
  let indexCut = Math.floor(Math.random() * Math.min(father.length, mother.length));
  let son = Array.from(mother.slice(0, indexCut).concat(father.slice(indexCut, father.length)));
  let daughter = Array.from(father.slice(0, indexCut).concat(mother.slice(indexCut, mother.length)));
  return [son, daughter];
};

genetic.mutate = function (individual) {
  let geneMutationProbability = this.userData['geneMutationProbability'];
  for (let i = 0; i < individual.length; i++) {
    if (Math.random() <= geneMutationProbability) {
      individual[i] = 1 - individual[i];
    }
  }
  return individual;
};

genetic.fitness = function (individual) {
  let errorCoefficient = this.userData['errorCoefficient'];
  let overweightCoefficient = this.userData['overweightCoefficient'];

  let weight = this.userData['weight'];
  let capacity = this.userData['capacity'];

  let sumWeight = 0;
  for (let i = 0; i < individual.length; i++) {
    sumWeight += weight[i] * individual[i];
  }

  return errorCoefficient * (1 - Math.abs(sumWeight - capacity) / capacity) + (sumWeight > capacity) ?
    overweightCoefficient * ((sumWeight - capacity) / capacity) : 0;
};

/*genetic.generation = function (pop, generation, stats) {

};*/
