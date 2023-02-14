const data = require('../data/zoo_data');

const allAnimals = data.species;

const animalLocations = () => {
  const newObj = {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  };
  allAnimals.forEach((elemento) => {
    const animalLocation = elemento.location;
    newObj[[animalLocation]].push(elemento.name);
  });
  return newObj;
};

const incluiNome = () => {
  const defaultLocation = animalLocations();
  const newObj = {};
  Object.assign(newObj, defaultLocation);
  Object.keys(defaultLocation).forEach((location) => {
    for (let index = 0; index < defaultLocation[location].length; index += 1) {
      const findAnimal = allAnimals.find(({ name: nome }) => nome
      === defaultLocation[location][index]);
      const allResidents = findAnimal.residents;
      const arrayResidents = [];
      allResidents.forEach((resident) => {
        arrayResidents.push(resident.name);
      });
      newObj[location][index] = {
        [defaultLocation[location][index]]: arrayResidents,
      };
    }
  });
  return newObj;
};

const incluiSexo = (obj, sexo) => {
  const newObj = {};
  Object.assign(newObj, obj);
  Object.keys(obj).forEach((location) => {
    obj[location].forEach((objAnimal, index) => {
      const nameAnimal = Object.keys(objAnimal)[0];
      const findAnimal = allAnimals.find(({ name: nome }) => nome === nameAnimal);
      const arrayResidents = [];
      findAnimal.residents.forEach((resident) => {
        if (resident.sex === sexo) {
          arrayResidents.push(resident.name);
        }
      });
      newObj[location][index][[nameAnimal]] = arrayResidents;
    });
  });
  return newObj;
};

const objOrdenada = (obj) => {
  const newObj = {};
  Object.assign(newObj, obj);
  Object.keys(obj).forEach((location) => {
    obj[location].forEach((objAnimal, index) => {
      const nameAnimal = Object.keys(objAnimal)[0];
      const { [nameAnimal]: nome } = objAnimal;
      if (nome !== undefined) {
        newObj[location][index][[nameAnimal]] = nome.sort();
      }
    });
  });
  return newObj;
};

const verificaOpcoes = (obj, opcoes) => {
  let objFinal = {};
  Object.assign(objFinal, obj);
  const opcoesDefinidas = Object.keys(opcoes);
  if (opcoesDefinidas.includes('sex')) {
    objFinal = incluiSexo(objFinal, opcoes.sex);
  }
  if (opcoesDefinidas.includes('sorted') && opcoes.sorted === true) {
    objFinal = objOrdenada(objFinal);
  }
  return objFinal;
};

function getAnimalMap(options) {
  if (options === undefined || !Object.keys(options).includes('includeNames')
  || options.includeNames === false) {
    return animalLocations();
  }
  if (options.includeNames === true) {
    return verificaOpcoes(incluiNome(), options);
  }
}

console.log(getAnimalMap({ includeNames: true, sorted: true }));

module.exports = getAnimalMap;
