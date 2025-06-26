const { validateSubject } = require('../../src/util/validateSubject');

describe('Validação de Disciplina', () => {
  test('deve retornar erro quando o nome da disciplina estiver vazio', () => {
    const subject = {
      name: '',
      teacher: 'João',
      classroom: '101',
      schedule: 'Segunda 10h',
      howToCalculate: 'P1+P2/2'
    };

    const result = validateSubject(subject);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('name', 'Nome da disciplina é obrigatório');
  });

  test('deve retornar erro quando o nome do professor estiver vazio', () => {
    const subject = {
      name: 'Matemática',
      teacher: '',
      classroom: '101',
      schedule: 'Segunda 10h',
      howToCalculate: 'P1+P2/2'
    };

    const result = validateSubject(subject);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('teacher', 'Nome do professor é obrigatório');
  });

  test('deve retornar erro quando a sala de aula estiver vazia', () => {
    const subject = {
      name: 'Matemática',
      teacher: 'João',
      classroom: '',
      schedule: 'Segunda 10h',
      howToCalculate: 'P1+P2/2'
    };

    const result = validateSubject(subject);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('classroom', 'Sala de aula é obrigatória');
  });

  test('deve retornar erro quando o horário estiver vazio', () => {
    const subject = {
      name: 'Matemática',
      teacher: 'João',
      classroom: '101',
      schedule: '',
      howToCalculate: 'P1+P2/2'
    };

    const result = validateSubject(subject);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('schedule', 'Horário é obrigatório');
  });

  test('deve retornar erro quando o método de cálculo estiver vazio', () => {
    const subject = {
      name: 'Matemática',
      teacher: 'João',
      classroom: '101',
      schedule: 'Segunda 10h',
      howToCalculate: ''
    };

    const result = validateSubject(subject);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('howToCalculate', 'Método de cálculo é obrigatório');
  });

  test('deve retornar erro quando a fórmula de cálculo for inválida', () => {
    const subject = {
      name: 'Matemática',
      teacher: 'João',
      classroom: '101',
      schedule: 'Segunda 10h',
      howToCalculate: 'abc'
    };

    const result = validateSubject(subject);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveProperty('howToCalculate', 'Fórmula de cálculo inválida');
  });

  test('não deve retornar erros quando todos os campos estiverem corretos', () => {
    const subject = {
      name: 'Matemática',
      teacher: 'João',
      classroom: '101',
      schedule: 'Segunda 10h',
      howToCalculate: 'P1+P2/2'
    };

    const result = validateSubject(subject);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });
});
