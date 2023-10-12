import FULL_ROUTES_ENUM from "../../routes/full_routes" 


const ITEMS = [
    {label: 'Financeiro', icon: 'pi pi-fw pi-bitcoin', items: [
        {label:'Lançamentos',icon:'pi pi-fw pi-hashtag'},
        {label:'DRE e Balanço',icon:'pi pi-fw pi-hashtag'},
        {label:'Controle de Compras',icon:'pi pi-fw pi-hashtag'},
        {label:'Fluxo de Caixa',icon:'pi pi-fw pi-hashtag'},

    ]},
    {label: 'Pessoal', icon: 'pi pi-fw pi-users', items: [
        {label:'Folha de Ponto',icon:'pi pi-calendar-times', url: FULL_ROUTES_ENUM.PESSOAL.FOLHA_PONTO}
    ]},
    {label: 'Produção', icon: 'pi pi-fw pi-box', items: [
        {label:'Extrato',icon:'pi pi-chart-bar', url: FULL_ROUTES_ENUM.PRODUCAO.EXTRATO},
        {label:'Estoque',icon:'pi pi-database', url: FULL_ROUTES_ENUM.PRODUCAO.SALDO},
        {label:'Item',icon:'pi pi-gift', url: FULL_ROUTES_ENUM.PRODUCAO.ITEM},
    ]},
    {label: 'Marketing', icon: 'pi pi-fw pi-chart-line'}
]


export default ITEMS