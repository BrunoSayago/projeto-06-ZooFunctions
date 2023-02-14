const data = require('../data/zoo_data');

function countEntrants(entrants) {
  let contaChild = 0;
  let contaAdult = 0;
  let contaSenior = 0;
  entrants.forEach((elemento) => {
    if (elemento.age < 18) {
      contaChild += 1;
    } else if (elemento.age >= 18 && elemento.age < 50) {
      contaAdult += 1;
    } else {
      contaSenior += 1;
    }
  });
  return { child: contaChild, adult: contaAdult, senior: contaSenior };
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants.length === 0 || Object.keys(entrants).length === 0) {
    return 0;
  }
  const agePersons = countEntrants(entrants);
  const precos = data.prices;
  const totalAdult = agePersons.adult * precos.adult;
  const totalChild = agePersons.child * precos.child;
  const totalSenior = agePersons.senior * precos.senior;
  return totalAdult + totalSenior + totalChild;
}

module.exports = { calculateEntry, countEntrants };
