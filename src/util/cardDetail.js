import { evaluate, lusolve } from 'mathjs';

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
            console.log({ x: this.numberOfGrades, uniqueMatchesLength: uniqueMatches.length })
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
        const newValues = [];
        this.values.map((value, i) => {
            newValues.push(typeof value.nota === 'number' ? value.nota : `n${i + 1}`);
        });

        try {
            let formula = this.latexFormula
                .replace(/n(\d+)/g, (_, index) => newValues[parseInt(index) - 1])
                .replace(/\\frac{(\d+)}{(\d+)}/g, '$1 / $2')
                .replace(/\\sqrt{([^}]*)}/g, 'sqrt($1)');

            formula = `${this.media} = ${formula.replace(/n(\d+)/g, 'n')}`;
            console.log(formula)
            const solvedFormula = lusolve(formula, 'n');
        } catch (error) {
            return 'Erro na expressão';
        }
    }
}

export default CardDetail;
