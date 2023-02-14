const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const allEmployees = data.employees;
  const findEmployee = allEmployees.find(({ id: numero }) => numero === id);
  const responsibleSpecies = findEmployee.responsibleFor;
  const firstSpecie = responsibleSpecies[0];
  const allAnimals = data.species;
  const findAnimal = allAnimals.find(({ id: numero }) => numero === firstSpecie);
  const oldAnimal = findAnimal.residents.reduce((acc, curr) => (acc.age < curr.age ? curr : acc));
  const { name, sex, age } = oldAnimal;
  return [name, sex, age];
}

module.exports = getOldestFromFirstSpecies;
