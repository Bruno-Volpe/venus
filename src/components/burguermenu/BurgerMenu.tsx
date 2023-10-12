import React, { useEffect, useState } from "react"
import { Container, OpenClose, Icon } from "./styled"
import { Sidebar } from 'primereact/sidebar'
import { Image } from 'primereact/image'
import { PanelMenu } from 'primereact/panelmenu'
import { Button } from 'primereact/button'
import { ToastContainer } from "react-toastify"
import { Dropdown } from 'primereact/dropdown'
import { SlLogout } from 'react-icons/sl'
import { Navigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { actLOGOUT, actSetMenuIsVisible, actSetMiniempresaId } from "../../store/actions/coreActions";
import { FaSun, FaMoon } from "react-icons/fa"        
import ITEMS from "./itens"
import { userInt } from "../../store/reducers/coreInterfaces"
import Service from "./service"
import addToastMessage from "../addmessagetoast/addMessageToast"
import { getToken, removeToken } from "../../services/auth"
import FULL_ROUTES_ENUM from "../../routes/full_routes"
import { Link } from "react-router-dom"

interface Miniempresa {
    id: number
    escola: number
    nome: string
    verification_code: string
    label_miniempresa: string
}


const BurgerMenu = (props: any) => {
    const service = new Service()

    const dispatch = useDispatch()
    const isLogged = useSelector<any, boolean>(state => state.coreReducer.isLogged)
    const isVisibleMenu = useSelector<any, boolean>(state => state.coreReducer.sideMenuIsVisible)
    const themeIsDark = useSelector<any, boolean>(state => state.coreReducer.themeIsDark)
    const currentUser = useSelector<any, userInt>(state => state.coreReducer.user)
    const miniempresaId = useSelector<any, number>(state => state.coreReducer.miniempresaId)



    const [miniempresas, setMiniempresas] = useState<Miniempresa[]>([])

    useEffect(() => {
        console.log('burguer ', isLogged)
        service.getMiniempresas().then(
            ({ data }: {data: Array<Miniempresa>}) => setMiniempresas(data),
            () => addToastMessage('error', 'Ocorreu um erro ao buscar as miniempresas disponiveis')
        )
    }, [])


    useEffect(() => {
        const body: any = document.querySelector('#root')
        body.style.marginLeft = isVisibleMenu ? '20rem' : '0rem'
        
    }, [isVisibleMenu, themeIsDark])


    
    const logout = () => {
        removeToken()
        dispatch(actLOGOUT())
    }

    const handleToggle = () => {
        const body: any = document.querySelector('#root')
        body.style.marginLeft = isVisibleMenu ? '0rem' : '20rem'

        dispatch(actSetMenuIsVisible({sideMenuIsVisible: !isVisibleMenu}))
    }


    const toggleTheme = () => {
      };


    return (
        <div>
            <Sidebar style={{backgroundColor: '#080808'}} 
                dismissable={false} 
                modal={false} 
                visible={isVisibleMenu} 
                showCloseIcon={false} 
                onHide={() => {}} >

                <Container>
                    <div className="grid w-12" >
                        <div className="col-6">
                            <Image src={require('../../assets/img/someLogo.png')} className="select-none" width="100" height="100" alt="Logo" />
                        </div>
                        
                        <div className="col-6 flex align-items-center justify-content-end ">
                            <div className={`text-3xl flex  text-${themeIsDark ? 'white' : 'black'} cursor-pointer`} onClick={() => toggleTheme()}>
                                {themeIsDark ? <FaSun /> : <FaMoon />}
                            </div>
                        </div>
                    </div>
                        
                    <div className="grid flex align-items-center justify-content-center mb-4 w-12" >
                        <div className="col-4 flex align-items-center justify-content-center" >
                            <Image src={require('../../assets/img/download-removebg-preview.png')} preview width="50" height="50" />
                        </div>

                        <div className="col-8 select-none">
                            <h3 className="m-0 ">{currentUser?.nome}</h3>
                        </div>
                    </div>
             
                    
                    <div className="grid w-12 mt-4 mb-6">
                        <div className="col-12">
                            <span className="p-float-label">
                                <Dropdown 
                                    value={miniempresaId} 
                                    onChange={({ value }) => dispatch(
                                        actSetMiniempresaId({miniempresaId: value})
                                        )} 
                                    options={miniempresas} 
                                    optionLabel="label_miniempresa" 
                                    optionValue="id"
                                    filter 
                                    className="w-full md:w-14rem" 
                                />
                                <label>Empresa</label>
                            </span>
                        </div>
                    </div>
                    <PanelMenu model={ITEMS} className="w-12"/>

                    <div className="grid mt-4 w-8" >
                        <div className="col-12" >
                            <Button
                                label="Sair"
                                icon={<SlLogout/>}
                                onClick={() => logout()}
                                className="p-button-danger w-12"
                            />
                        </div>
                    </div>                    

                </Container>
            </Sidebar>
            <OpenClose onClick={() => handleToggle()}> 
                <Icon className={`pi ${isVisibleMenu ? 'pi-arrow-left' : 'pi-arrow-right'}`} />
            </OpenClose>
            <ToastContainer theme="dark" />
        </div>

    )
}

export default BurgerMenu