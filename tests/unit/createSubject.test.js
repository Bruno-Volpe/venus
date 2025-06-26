import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreNewSubject from '../../src/pages/storeNewSubject';
import { validateSubject } from '../../src/util/validateSubject';

jest.mock('../../src/service/firebaseConnection', () => ({
  auth: {
    currentUser: { uid: 'test-user-id' }
  },
  firestore: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    add: jest.fn().mockResolvedValue({ id: 'test-subject-id' })
  },
  storage: {
    ref: jest.fn().mockReturnThis(),
    putString: jest.fn().mockResolvedValue({
      ref: { getDownloadURL: jest.fn().mockResolvedValue('test-image-url') }
    })
  }
}));

describe('StoreNewSubject - Criação de Disciplina', () => {
  test('deve validar os campos obrigatórios', () => {
    const subjectData = {
      name: '',
      teacher: '',
      classroom: '',
      schedule: '',
      howToCalculate: ''
    };

    const { isValid, errors } = validateSubject(subjectData);

    expect(isValid).toBe(false);
    expect(errors).toEqual({
      name: 'Nome da disciplina é obrigatório',
      teacher: 'Nome do professor é obrigatório',
      classroom: 'Sala de aula é obrigatória',
      schedule: 'Horário é obrigatório',
      howToCalculate: 'Método de cálculo é obrigatório'
    });
  });

  test('deve aceitar dados válidos', () => {
    const subjectData = {
      name: 'Matemática',
      teacher: 'Prof. João',
      classroom: 'Sala 101',
      schedule: 'Segunda 14:00',
      howToCalculate: '(P1 + P2) / 2'
    };

    const { isValid, errors } = validateSubject(subjectData);

    expect(isValid).toBe(true);
    expect(errors).toEqual({});
  });

  test('deve validar o formato da fórmula de cálculo', () => {
    const subjectData = {
      name: 'Matemática',
      teacher: 'Prof. João',
      classroom: 'Sala 101',
      schedule: 'Segunda 14:00',
      howToCalculate: 'fórmula inválida'
    };

    const { isValid, errors } = validateSubject(subjectData);

    expect(isValid).toBe(false);
    expect(errors.howToCalculate).toBe('Fórmula de cálculo inválida');
  });
});
