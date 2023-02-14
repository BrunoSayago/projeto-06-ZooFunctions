const data = require('../data/zoo_data');

function isManager(id) {
  const allEmployees = data.employees;
  const findPerson = allEmployees.find(({ id: numero }) => numero === id);
  const managers = ['Burl', 'Ola', 'Stephanie'];
  return managers.includes(findPerson.firstName);
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId) === false) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  const allEmployees = data.employees;
  const liderados = [];
  allEmployees.forEach((elemento) => {
    if (elemento.managers.includes(managerId)) {
      liderados.push(`${elemento.firstName} ${elemento.lastName}`);
    }
  });
  return liderados;
}

module.exports = { isManager, getRelatedEmployees };
