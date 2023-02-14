const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  if (ids.length === 0) {
    return [];
  }
  const species = ids.map((elemento) => {
    const arraySpecies = data.species;
    return arraySpecies.find(({ id: nome }) => nome === elemento);
  });
  return species;
}

module.exports = getSpeciesByIds;
