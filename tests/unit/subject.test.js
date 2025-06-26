const CardDetail = require('../../src/util/cardDetail').default;
const { validateSubject } = require('../../src/util/validateSubject');

describe('Validação de Disciplina', () => {
  describe('validateSubject', () => {
    test('deve validar campos obrigatórios', () => {
      const disciplinaIncompleta = {
        name: '',
        teacher: '',
        classroom: '',
        schedule: '',
        howToCalculate: ''
      };

      const { isValid, errors } = validateSubject(disciplinaIncompleta);

      expect(isValid).toBe(false);
      expect(errors).toEqual({
        name: 'Nome da disciplina é obrigatório',
        teacher: 'Nome do professor é obrigatório',
        classroom: 'Sala de aula é obrigatória',
        schedule: 'Horário é obrigatório',
        howToCalculate: 'Método de cálculo é obrigatório'
      });
    });

    test('deve aceitar disciplina válida', () => {
      const disciplinaValida = {
        name: 'Cálculo I',
        teacher: 'Prof. Silva',
        classroom: 'Sala 101',
        schedule: 'Segunda 14:00',
        howToCalculate: '(P1 + P2) / 2'
      };

      const { isValid, errors } = validateSubject(disciplinaValida);

      expect(isValid).toBe(true);
      expect(errors).toEqual({});
    });
  });
});

describe('CardDetail', () => {
  describe('constructor', () => {
    test('deve inicializar com valores padrão', () => {
      const card = new CardDetail();

      expect(card.latexFormula).toBe('');
      expect(card.values).toBeUndefined();
      expect(card.numberOfGrades).toBeUndefined();
      expect(card.media).toBe(0);
    });

    test('deve inicializar com valores fornecidos', () => {
      const values = [{ nota: 7 }, { nota: 8 }];
      const card = new CardDetail('n1 + n2', values, 2, 15);

      expect(card.latexFormula).toBe('n1 + n2');
      expect(card.values).toEqual(values);
      expect(card.numberOfGrades).toBe(2);
      expect(card.media).toBe(15);
    });
  });
});
