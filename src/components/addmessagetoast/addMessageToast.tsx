import React from "react"
import CustomMessage from "../custommessagetoast/CustomMessageToast"
import { toast as ToastModule } from "react-toastify"



type Toast = typeof ToastModule & { [key: string]: (content: React.ReactNode, options?: any) => void }
const toast: Toast = ToastModule as Toast



//Importar o componente abaixo no arquivo alvo, em seguida adicionar no html
//import { ToastContainer } from "react-toastify"

const addToastMessage = (tipo: string, message: string) => {
    let title
    switch (tipo) {
        case 'success':
            title = 'Sucesso!'
            break
        case 'warn':
            title = 'Atenção!'
            break
        case 'info':
            title = 'Atenção!'
            break
        case 'error':
            title = 'Erro!'
            break
        default:
            title = 'Erro!'
            break
    }

    toast[tipo] (
        <CustomMessage 
            title={title}
            bodyMsg={message} 
        />,
        {autoClose: 3000, closeOnClick: false}
    )
}

export default addToastMessage
