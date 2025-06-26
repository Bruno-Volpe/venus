const mockAxios = {
  post: jest.fn((url, data) => {
    return Promise.resolve({ data: { result: eval(data.expression) } });
  })
};

module.exports = mockAxios;
