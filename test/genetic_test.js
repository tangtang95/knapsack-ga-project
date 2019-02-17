import assert from 'assert';
import {genetic} from '../src/js/main';
import {describe, it} from 'mocha';

beforeEach(() =>{
  genetic.userData = {};
});

describe('Genetic algorithm', () =>{
  describe('#seed',() =>{
    for (let i = 0; i < 100; i++) {
      it(`should return the correct number of elements: ${i} elements`, () =>{
        genetic.userData['numberOfObjects'] = i;
        let element = genetic.seed();
        assert.strictEqual(element.length, genetic.userData['numberOfObjects']);
      });
    }
  });

  describe('#crossover', () => {
    it('should return two elements', () => {
      let father = [1, 1, 1, 1];
      let mother = [0, 0, 0, 0];
      let children = genetic.crossover(father, mother);
      assert.strictEqual(children.length, 2);
    });
  });

  describe('#mutate', () => {
    it('should switch every bit if probability equal to 1', function () {
      genetic.userData['geneMutationProbability'] = 1.0;
      let individual = [0, 1, 1, 0];
      assert.deepStrictEqual(genetic.mutate(individual), [1, 0, 0, 1]);
    });
  });

  describe('#fitness', () =>{

  });

});
