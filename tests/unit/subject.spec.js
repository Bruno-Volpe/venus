import { jest } from '@jest/globals';
import CardDetail from '../../src/util/cardDetail';
import axios from 'axios';

// Mock do axios para a API de avaliação de fórmulas
jest.mock('axios');

describe('CardDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('resolveFormula', () => {
    test('deve calcular média com fórmula simples', async () => {
      const mockResponse = { data: { result: 7.5 } };
      axios.post.mockResolvedValue(mockResponse);
      const values = [
        { nota: 7 },
        { nota: 8 }
      ];
      const card = new CardDetail('(n1 + n2) / 2', values, 2);
      const result = await card.resolveFormula();
      expect(result.result).toBe(7.5);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          expressao: '(7 + 8) / 2'
        })
      );
    });

    test('deve resolver a fórmula corretamente', async () => {
      axios.post.mockResolvedValue({ data: { result: 15 } });
      const values = [
        { nota: 7 },
        { nota: 8 }
      ];
      const card = new CardDetail('nota1 + nota2', values, 2);
      const result = await card.resolveFormula();
      expect(result.result).toBe(15);
    });

    test('deve processar fórmulas com LaTeX', async () => {
      const mockResponse = { data: { result: 2.5 } };
      axios.post.mockResolvedValue(mockResponse);
      const values = [
        { nota: 5 }
      ];
      const card = new CardDetail('\\frac{n1}{2}', values, 1);
      const result = await card.resolveFormula();
      expect(result.result).toBe(2.5);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          expressao: '5 / 2'
        })
      );
    });

    test('deve processar fórmulas com raiz quadrada', async () => {
      const mockResponse = { data: { result: 3 } };
      axios.post.mockResolvedValue(mockResponse);
      const values = [
        { nota: 9 }
      ];
      const card = new CardDetail('\\sqrt{n1}', values, 1);
      const result = await card.resolveFormula();
      expect(result.result).toBe(3);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          expressao: 'sqrt(9)'
        })
      );
    });
  });

  describe('construtor', () => {
    test('deve inicializar com valores padrão', () => {
      const card = new CardDetail();

      expect(card.latexFormula).toBe('');
      expect(card.values).toBeUndefined();
      expect(card.numberOfGrades).toBeUndefined();
      expect(card.media).toBe(0);
    });

    test('deve inicializar com valores fornecidos', () => {
      const values = [{ nota: 7 }, { nota: 8 }];
      const card = new CardDetail('(n1 + n2) / 2', values, 2, 7.5);

      expect(card.latexFormula).toBe('(n1 + n2) / 2');
      expect(card.values).toEqual(values);
      expect(card.numberOfGrades).toBe(2);
      expect(card.media).toBe(7.5);
    });
  });
});

// Os testes e2e foram movidos para /tests/e2e/createSubject.spec.js
