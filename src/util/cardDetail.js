import axios from 'axios'
//import { simplify } from 'mathjs';

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
        // eslint-disable-next-line array-callback-return
        this.values.map(value => {
            newValues.push(typeof (value.nota) === 'number' ? value.nota : 0)
        })

        try {
            const formula = this.latexFormula
                .replace(/n(\d+)/g, (_, index) => newValues[parseInt(index) - 1])
                .replace(/\\frac{(\d+)}{(\d+)}/g, '$1 / $2')
                .replace(/\\sqrt{([^}]*)}/g, 'sqrt($1)');
            const evaluatedResult = evaluate(formula).then(result => result);
            return evaluatedResult;
        } catch (error) {
            return 'Erro na expressão';
        }
    }

    checkVariableCount() {
        const regex = /n\d+/g;
        const matches = this.latexFormula.match(regex);
        const numberOfGrades = criarArray(this.numberOfGrades).map(n => `n${n}`);

        if (matches) {
            const uniqueMatches = [...new Set(matches)]; // Remove duplicatas

            if (uniqueMatches.length === Number(this.numberOfGrades)) {
                return isEqualArray(uniqueMatches, numberOfGrades);
            };
        }

        return false;
    }

    async getStatusMedia() {
        const mediaAluno = await this.resolveFormula()

        if (mediaAluno >= this.media) {
            return true
        }
        return false
    }

    calculateMissingVariables() {
        const newValues = [];
        // eslint-disable-next-line array-callback-return
        this.values.map((value, i) => {
            newValues.push(typeof value.nota === 'number' ? value.nota : `n${i + 1}`);
        });

        try {
            let formula = this.latexFormula
                .replace(/n(\d+)/g, (_, index) => newValues[parseInt(index) - 1])
                .replace(/\\frac{(\d+)}{(\d+)}/g, '$1 / $2')
                .replace(/\\sqrt{([^}]*)}/g, 'sqrt($1)');

            formula = (`${formula.replace(/n(\d+)/g, 'n')}`) //PODE DAR ERRO AQUI
            return resolverEquacao(formula, this.media).then((result) => {
                return (result.filter(elemento => elemento > 0)[0])
            })
        } catch (error) {
            return 'Erro na expressão';
        }
    }
}

function isEqualArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}


function criarArray(numero) {
    let resultado = [];
    for (let i = 1; i <= numero; i++) {
        resultado.push(i);
    }
    return resultado;
}

async function resolverEquacao(expressao, valor) {
    const result = await axios.post('https://apat3.pythonanywhere.com/resolver', {
        expressao,
        valor
    })

    return result.data.solucoes
}

async function evaluate(expressao) {
    const result = await axios.post('https://apat3.pythonanywhere.com/evaluate', {
        expressao
    })

    return result.data
}


export default CardDetail;
