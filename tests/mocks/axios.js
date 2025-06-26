const mockAxios = {
  post: jest.fn((url, data) => {
    // Simula um resultado fixo para evitar uso de eval e problemas de segurança
    return Promise.resolve({ data: { result: 42 } });
  })
};

module.exports = mockAxios;
