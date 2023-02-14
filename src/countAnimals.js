const data = require('../data/zoo_data');

function countAnimals(animal) {
  const allAnimals = data.species;
  if (animal === undefined) {
    const objAllAnimals = {};
    allAnimals.forEach((elemento) => {
      objAllAnimals[[elemento.name]] = elemento.residents.length;
    });
    return objAllAnimals;
  }
  const { specie, sex = 'any' } = animal;
  const findAnimal = allAnimals.find((elemento) => elemento.name === specie);
  if (sex === 'any') {
    return findAnimal.residents.length;
  }
  return findAnimal.residents.filter(({ sex: sexo }) => sexo === sex).length;
}

module.exports = countAnimals;
