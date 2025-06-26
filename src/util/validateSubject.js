const validateFormula = (formula) => {
  try {
    // Remove espaços e verifica se há caracteres válidos
    const cleanFormula = formula.replace(/\s/g, '');
    const validChars = /^[0-9P+\-*\/().,\s]+$/;

    if (!validChars.test(cleanFormula)) {
      return false;
    }

    // Verifica se os parênteses estão balanceados
    let parenthesesCount = 0;
    for (const char of cleanFormula) {
      if (char === '(') parenthesesCount++;
      if (char === ')') parenthesesCount--;
      if (parenthesesCount < 0) return false;
    }
    if (parenthesesCount !== 0) return false;

    // Verifica se há operadores válidos e provas (P1, P2, etc)
    const hasValidOperators = /[+\-*\/]/.test(cleanFormula);
    const hasValidGrades = /P[0-9]/.test(cleanFormula);

    return hasValidOperators && hasValidGrades;
  } catch (error) {
    return false;
  }
};

export const validateSubject = (data) => {
  const errors = {};

  if (!data.name?.trim()) {
    errors.name = 'Nome da disciplina é obrigatório';
  }

  if (!data.teacher?.trim()) {
    errors.teacher = 'Nome do professor é obrigatório';
  }

  if (!data.classroom?.trim()) {
    errors.classroom = 'Sala de aula é obrigatória';
  }

  if (!data.schedule?.trim()) {
    errors.schedule = 'Horário é obrigatório';
  }

  if (!data.howToCalculate?.trim()) {
    errors.howToCalculate = 'Método de cálculo é obrigatório';
  } else if (!validateFormula(data.howToCalculate)) {
    errors.howToCalculate = 'Fórmula de cálculo inválida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
