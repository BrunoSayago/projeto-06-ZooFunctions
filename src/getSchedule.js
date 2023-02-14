const data = require('../data/zoo_data');

const verificaAnimal = (nomeAnimal) => {
  const allAnimals = data.species;
  return allAnimals.some(({ name: nome }) => nome === nomeAnimal);
};

const verificaDia = (nomeDia) => {
  const zooSchedule = data.hours;
  const allDays = Object.keys(zooSchedule);
  return allDays.includes(nomeDia);
};

const verificaAny = (entrada) => {
  if (verificaAnimal(entrada) === false && verificaDia(entrada) === false) {
    return true;
  }
  return false;
};

const criaSemiSchedule = () => {
  const zDays = data.hours;
  const allDays = Object.keys(zDays);
  const newObj = {};
  allDays.forEach((elemento) => {
    const horarioDia = [zDays[elemento].open, zDays[elemento].close];
    newObj[[elemento]] = { officeHour: `Open from ${horarioDia[0]}am until ${horarioDia[1]}pm` };
  });
  newObj.Monday.officeHour = 'CLOSED';
  return newObj;
};

const criaScheduleTotal = () => {
  const agenda = criaSemiSchedule();
  const allDays = Object.keys(agenda);
  const allAnimals = data.species;
  allDays.forEach((elemento) => {
    const animaisDia = [];
    allAnimals.forEach((animal) => {
      if (animal.availability.includes(elemento)) {
        animaisDia.push(animal.name);
      }
    });
    agenda[elemento].exhibition = animaisDia;
  });
  agenda.Monday.exhibition = 'The zoo will be closed!';
  return agenda;
};

function getSchedule(scheduleTarget) {
  if (scheduleTarget === undefined || verificaAny(scheduleTarget) === true) {
    return criaScheduleTotal();
  }
  if (verificaAnimal(scheduleTarget) === true) {
    const achaAnimal = data.species.find(({ name: nome }) => nome === scheduleTarget);
    return achaAnimal.availability;
  }
  const newObj = {};
  newObj[scheduleTarget] = criaScheduleTotal()[scheduleTarget];
  return newObj;
}

module.exports = getSchedule;
