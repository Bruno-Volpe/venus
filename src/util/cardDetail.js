import { evaluate } from 'mathjs';

class CardDetail {
    constructor(
        latexFormula = '',
        values,
        numberOfGrades,
        media = 0
    ) {
        this.latexFormula = latexFormula
        this.values = values
        this.numberOfGrades = numberOfGrades
        this.media = media
    }

    resolveFormula() {
        const newValues = []
        this.values.map(value => {
            newValues.push(typeof (value.nota) === 'number' ? value.nota : 0)
        })

        try {
            const formula = this.latexFormula
                .replace(/n(\d+)/g, (_, index) => newValues[parseInt(index) - 1])
                .replace(/\\frac{(\d+)}{(\d+)}/g, '$1 / $2')
                .replace(/\\sqrt{([^}]*)}/g, 'sqrt($1)');
            const evaluatedResult = evaluate(formula);
            return evaluatedResult;
        } catch (error) {
            return 'Erro na expressão';
        }
    }

    checkVariableCount() {
        const regex = /n\d+/g;
        const matches = this.latexFormula.match(regex);

        if (matches) {
            const uniqueMatches = [...new Set(matches)]; // Remove duplicatas
            return uniqueMatches.length === Number(this.numberOfGrades);
        }

        return false;
    }

    getStatusMedia() {
        const mediaAluno = this.resolveFormula()
        if (mediaAluno >= this.media) {
            return true
        }
        return false
    }

    calculateMissingVariables() {
        const regex = /n\d+/g;
        const matches = this.latexFormula.match(regex);

        if (matches) {
            const uniqueMatches = [...new Set(matches)]; // Remove duplicatas
            const missingVariables = [];

            for (let i = 1; i <= this.numberOfGrades; i++) {
                if (!uniqueMatches.includes(`n${i}`)) {
                    missingVariables.push(i);
                }
            }

            if (missingVariables.length > 0) {
                const possibleValues = [];

                for (let i = 1; i <= this.numberOfGrades; i++) {
                    if (!this.values.find(value => value.nota === i)) {
                        possibleValues.push(i);
                    }
                }

                if (possibleValues.length >= missingVariables.length) {
                    const combinations = this.generateCombinations(possibleValues, missingVariables.length);

                    for (const combination of combinations) {
                        const tempValues = [...this.values];
                        for (let i = 0; i < missingVariables.length; i++) {
                            const index = tempValues.findIndex(value => value.nota === combination[i]);
                            tempValues[index] = { nota: missingVariables[i] };
                        }

                        const cardDetail = new CardDetail(this.latexFormula, tempValues, this.numberOfGrades, this.media);
                        const result = cardDetail.resolveFormula();

                        if (result === this.media) {
                            return tempValues;
                        }
                    }
                }
            }
        }

        return null;
    }

    generateCombinations(arr, size) {
        const combinations = [];

        function backtrack(start, combination) {
            if (combination.length === size) {
                combinations.push([...combination]);
                return;
            }

            for (let i = start; i < arr.length; i++) {
                combination.push(arr[i]);
                backtrack(i + 1, combination);
                combination.pop();
            }
        }

        backtrack(0, []);

        return combinations;
    }
}

export default CardDetail;
