const getOpeningHours = require('../src/getOpeningHours');
const data = require('../data/zoo_data');

describe('Testes da função getOpeningHours', () => {
  it('sem parâmetros, retorna todo o horário de funcionamento', () => {
    const actual = getOpeningHours();

    const expected = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };

    expect(actual).toEqual(expected);
  });

  it('Testa se, passando o dia com letras maiusculas e minusculas alternadas, retorna corretamente', () => {
    const actual = getOpeningHours('tUeSDaY', '10:20-AM');

    const expected = 'The zoo is open';

    expect(actual).toEqual(expected);
  });

  it('Testa se, passando um dia incorreto, ele retorna o erro devidamente', () => {
    function funcaoTeste() {
      getOpeningHours('segunda', '10:20-AM');
    }

    expect(funcaoTeste).toThrowError('The day must be valid. Example: Monday');
  });

  it('Testa se, passando letras nas horas, ele retorna o erro devidamente', () => {
    function funcaoTeste() {
      getOpeningHours('Sunday', 'xx:20-AM');
    }

    expect(funcaoTeste).toThrowError('The hour should represent a number');
  });

  it('Testa se, passando letras nos minutos, ele retorna o erro devidamente', () => {
    function funcaoTeste() {
      getOpeningHours('Sunday', '10:xx-AM');
    }

    expect(funcaoTeste).toThrowError('The minutes should represent a number');
  });

  it('Testa se, passando a abreviação errada, ele retorna o erro devidamente', () => {
    function funcaoTeste() {
      getOpeningHours('Sunday', '10:20-BS');
    }

    expect(funcaoTeste).toThrowError('The abbreviation must be \'AM\' or \'PM\'');
  });

  it('Testa se, passando uma hora inválida, ele retorna o erro devidamente', () => {
    function funcaoTeste() {
      getOpeningHours('Sunday', '25:20-AM');
    }

    expect(funcaoTeste).toThrowError('The hour must be between 0 and 12');
  });

  it('Testa se, passando minutos inválidos, ele retorna o erro devidamente', () => {
    function funcaoTeste() {
      getOpeningHours('Sunday', '10:70-AM');
    }

    expect(funcaoTeste).toThrowError('The minutes must be between 0 and 59');
  });

  it('Testa se o dia for monday, fala que está fechado', () => {
    const actual = getOpeningHours('monday', '10:20-AM');

    expect(actual).toEqual('The zoo is closed');
  });

  it('Testa condicoes em que o zoologico está fechado, e confere se o resultado é correto', () => {
    const arreyCondicoes = [
      getOpeningHours('Tuesday', '07:20-AM'),
      getOpeningHours('Tuesday', '09:50-PM'),
      getOpeningHours('wednesday', '05:10-AM'),
      getOpeningHours('wednesday', '06:50-PM'),
      getOpeningHours('thursday', '09:59-AM'),
      getOpeningHours('thursday', '08:01-PM'),
      getOpeningHours('friday', '12:01-AM'),
      getOpeningHours('friday', '10:01-PM'),
      getOpeningHours('saturday', '02:45-AM'),
      getOpeningHours('saturday', '11:45-PM'),
      getOpeningHours('sunday', '05:10-AM'),
      getOpeningHours('sunday', '9:23-PM'),
    ];

    arreyCondicoes.forEach((condicao) => {
      expect(condicao).toEqual('The zoo is closed');
    });
  });

  it('Testa condicoes em que o zoologico está aberto, e confere se o resultado é correto', () => {
    const arreyCondicoes = [
      getOpeningHours('Tuesday', '08:01-AM'),
      getOpeningHours('Tuesday', '05:59-PM'),
      getOpeningHours('wednesday', '09:20-AM'),
      getOpeningHours('wednesday', '04:50-PM'),
      getOpeningHours('thursday', '11:59-AM'),
      getOpeningHours('thursday', '12:01-PM'),
      getOpeningHours('friday', '10:45-AM'),
      getOpeningHours('friday', '06:46-PM'),
      getOpeningHours('saturday', '08:45-AM'),
      getOpeningHours('saturday', '04:45-PM'),
      getOpeningHours('sunday', '10:10-AM'),
      getOpeningHours('sunday', '05:23-PM'),
    ];

    arreyCondicoes.forEach((condicao) => {
      expect(condicao).toEqual('The zoo is open');
    });
  });
});
