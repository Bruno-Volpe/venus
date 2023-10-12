
function FormateDateString(date) {
    
    const ano = date.slice(0,4);
    const mes = date.slice(5,7);
    const dia = date.slice(8,10);
    const formato = mes + '/' + dia + '/' + ano;
    const data = new Date(formato)
    const dataFormatada = data.toLocaleDateString('pt-br')
    return dataFormatada
}

export default FormateDateString;