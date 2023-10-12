import { AxiosPromise } from "axios"
import { Api, SERVICE } from "../../services/Api"

class Service {
    private apiPessoal: Api

    constructor() {
        this.apiPessoal = new Api(SERVICE.PESSOAL)
    }

    public async getMiniempresas(): AxiosPromise {
        return this.apiPessoal.axios.get(`api/miniempresa/`)
    }

}


export default Service