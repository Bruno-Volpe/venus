const validateSubject = require('../../src/utils/validateSubject');

describe('Validação de Disciplina', () => {
  test('deve retornar erro quando o nome da disciplina estiver vazio', () => {
    const subject = {
      subjectName: '',
      techerName: 'João',
      techerEmail: 'joao@email.com',
      media: '7'
    };

    const errors = validateSubject(subject);
    expect(errors).toContain('Nome da disciplina é obrigatório');
  });

  test('deve retornar erro quando o email do professor for inválido', () => {
    const subject = {
      subjectName: 'Matemática',
      techerName: 'João',
      techerEmail: 'email_invalido',
      media: '7'
    };

    const errors = validateSubject(subject);
    expect(errors).toContain('Email do professor inválido');
  });

  test('deve retornar erro quando a média não for um número', () => {
    const subject = {
      subjectName: 'Matemática',
      techerName: 'João',
      techerEmail: 'joao@email.com',
      media: 'abc'
    };

    const errors = validateSubject(subject);
    expect(errors).toContain('Média é obrigatória e deve ser um número');
  });

  test('não deve retornar erros quando todos os campos estiverem corretos', () => {
    const subject = {
      subjectName: 'Matemática',
      techerName: 'João',
      techerEmail: 'joao@email.com',
      media: '7'
    };

    const errors = validateSubject(subject);
    expect(errors.length).toBe(0);
  });
});
