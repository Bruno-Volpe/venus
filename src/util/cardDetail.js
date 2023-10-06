import { evaluate } from 'mathjs';

class CardDetail {
    constructor(
        latexFormula,
        values,
        numberOfGrades
    ) {
        this.latexFormula = latexFormula
        this.values = values
        this.numberOfGrades = numberOfGrades
    }

    resolveFormula() {
        const newValues = []
        this.values.map(value => {
            newValues.push(value.nota)
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
            console.log({ x: this.numberOfGrades, uniqueMatchesLength: uniqueMatches.length })
            return uniqueMatches.length === Number(this.numberOfGrades);
        }

        return false;
    }
}

export default CardDetail;
