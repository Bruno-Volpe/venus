import { evaluate, simplify } from 'mathjs';

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
            let soluction
            let formula = this.latexFormula
                .replace(/n(\d+)/g, (_, index) => newValues[parseInt(index) - 1])
                .replace(/\\frac{(\d+)}{(\d+)}/g, '$1 / $2')
                .replace(/\\sqrt{([^}]*)}/g, 'sqrt($1)');

            formula = simplify(`${formula.replace(/n(\d+)/g, 'n')}`).toString();
            formula = formula.replace(/(\d*)n/g, (match, p1) => `${p1 ? p1 : ''}n`);
            resolverEquacao(formula, this.media)
                .then(solucoes => soluction = solucoes)
                .catch(error => console.error(error));

            console.log(soluction)
        } catch (error) {
            return 'Erro na expressão';
        }
    }
}

function resolverEquacao(expressao, valor) {
    const formData = new FormData();
    formData.append('expressao', expressao);
    formData.append('valor', valor);

    return fetch('/resolver', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => data.solucoes)
        .catch(error => console.error('Erro:', error));
}

export default CardDetail;
