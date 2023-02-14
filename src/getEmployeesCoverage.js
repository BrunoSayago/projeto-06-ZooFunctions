const data = require('../data/zoo_data');

const createArrayLocations = (employee) => {
  const animalsEmployee = employee.responsibleFor;
  const locations = [];
  const allAnimals = data.species;
  animalsEmployee.forEach((elemento) => {
    allAnimals.forEach((animal) => {
      if (elemento === animal.id) {
        locations.push(animal.location);
      }
    });
  });
  return locations;
};

const createArraySpecies = (employee) => {
  const animalsEmployee = employee.responsibleFor;
  const speciesEmployee = [];
  const allAnimals = data.species;
  animalsEmployee.forEach((elemento) => {
    allAnimals.forEach((animal) => {
      if (elemento === animal.id && !speciesEmployee.includes(animal.name)) {
        speciesEmployee.push(animal.name);
      }
    });
  });
  return speciesEmployee;
};

const createObjEmployee = (employee) => {
  const newObj = {
    id: employee.id,
    fullName: `${employee.firstName} ${employee.lastName}`,
    species: createArraySpecies(employee),
    locations: createArrayLocations(employee),
  };
  return newObj;
};

const verificaDado = (dado) => {
  const allEmployees = data.employees;
  let existeDado = false;
  allEmployees.forEach((elemento) => {
    if (elemento.firstName === dado || elemento.lastName === dado || elemento.id === dado) {
      existeDado = true;
    }
  });
  return existeDado;
};

const caseName = (obj) => {
  const allEmployees = data.employees;
  const nome = obj.name;
  const objectEmployee = allEmployees.find((elemento) => elemento.firstName === nome
    || elemento.lastName === nome);
  return objectEmployee;
};

const caseId = (obj) => {
  const allEmployees = data.employees;
  const idEmployee = obj.id;
  const objectEmployee = allEmployees.find((elemento) => elemento.id === idEmployee);
  return objectEmployee;
};

const caseAll = () => {
  const newArray = [];
  const allEmployees = data.employees;
  allEmployees.forEach((elemento) => {
    newArray.push(createObjEmployee(elemento));
  });
  return newArray;
};

function getEmployeesCoverage(obj) {
  if (obj === undefined) {
    return caseAll();
  }
  const chave = Object.keys(obj);
  const valor = Object.values(obj)[0];
  if (verificaDado(valor) === false) {
    throw new Error('Informações inválidas');
  }
  if (chave.includes('name')) {
    return createObjEmployee(caseName(obj));
  }
  if (chave.includes('id')) {
    return createObjEmployee(caseId(obj));
  }
}

console.log(getEmployeesCoverage({ id: 'c1f50212-35a6-4ecd-8223-f835538526c2' }));

module.exports = getEmployeesCoverage;
