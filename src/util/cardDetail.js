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

    getStatusMedia() {
        const mediaAluno = this.resolveFormula()
        if (mediaAluno >= this.media) {
            return true
        }
        return false
    }

    calculateMissingVariables() {

        const newValues = this.values.map((value, i) => {
            return typeof value.nota === 'number' ? value.nota : `n${i + 1}`;
        });

        const equation = `(${newValues.join(' + ')}) / ${newValues.length} = ${this.media}`;

        try {
            const solution = evaluate(equation);

            const updatedValues = this.values.map((value, i) => {
                if (typeof value.nota !== 'number') {
                    return { ...value, nota: solution[i] };
                }
                return value;
            });

            return ({ values: updatedValues });
        } catch (error) {
            console.error("Erro ao resolver a equação:", error);
        }
    }
}

export default CardDetail;
