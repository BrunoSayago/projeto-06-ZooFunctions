const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const findAnimal = data.species.find(({ name: nome }) => nome === animal);
  const residentes = findAnimal.residents;
  return residentes.every(({ age: idade }) => idade >= age);
}

module.exports = getAnimalsOlderThan;
