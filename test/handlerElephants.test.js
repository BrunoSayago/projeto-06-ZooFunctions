const handlerElephants = require('../src/handlerElephants');
const data = require('../data/zoo_data');

describe('Testes da função HandlerElephants', () => {
  it('Testanto função quando não é passado nenhum parâmetro:', () => {
    const actual = handlerElephants();
    expect(actual).toBeUndefined();
  });

  it('Testanto função quando o parâmetro não é string:', () => {
    const arrayCondicoes = [handlerElephants(10), handlerElephants(true), handlerElephants(null)];
    arrayCondicoes.forEach((condicao) => {
      expect(condicao).toEqual('Parâmetro inválido, é necessário uma string');
    });
  });

  it('Testanto função quando o parâmetro é count:', () => {
    const actual = handlerElephants('count');
    expect(actual).toEqual(4);
  });

  it('Testanto função quando o parâmetro é name:', () => {
    const actual = handlerElephants('names');

    const expected = ['Ilana', 'Orval', 'Bea', 'Jefferson'];

    expect(actual).toEqual(expected);
  });

  it('Testanto função quando o parâmetro é averageAge:', () => {
    const actual = handlerElephants('averageAge');

    expect(actual).toEqual(10.5);
  });

  it('Testanto função quando o parâmetro é string mas não é nenhuma possibilidade', () => {
    const actual = handlerElephants('randomString');

    expect(actual).toBeNull();
  });

  it('Testanto linha 30 (retorna as informações se estão no data):', () => {
    const arreyKeys = ['id', 'name', 'popularity', 'location', 'availability', 'residents'];
    const elephants = data.species.find((specie) => specie.name === 'elephants');

    arreyKeys.forEach((key) => {
      const actual = handlerElephants(key);
      const expected = elephants[key];
      expect(actual).toBe(expected);
    });
  });
});
