// Arquivo de setup para testes do Jest
import '@testing-library/jest-dom';

// Mock global de funções do Firebase
global.firebase = {
  auth: jest.fn(() => ({
    currentUser: { uid: 'test-user-id' },
    signInWithPopup: jest.fn().mockResolvedValue({ user: { uid: 'test-user-id' } })
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      add: jest.fn().mockResolvedValue({ id: 'test-doc-id' }),
      doc: jest.fn(() => ({
        get: jest.fn().mockResolvedValue({
          exists: true,
          data: () => ({ id: 'test-doc-id' })
        })
      }))
    }))
  })),
  storage: jest.fn(() => ({
    ref: jest.fn(() => ({
      put: jest.fn().mockResolvedValue({
        ref: {
          getDownloadURL: jest.fn().mockResolvedValue('test-url')
        }
      })
    }))
  }))
};

// Mock de funções matemáticas
global.evaluate = jest.fn();
