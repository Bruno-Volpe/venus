import styled from "styled-components"


export const SidebarContainer = styled.div`
    position: absolute;
    top: 0;
    transition: all 300ms;
    left: ${props => props.isActive ? '0' : '-17rem'};
    background-color: rgb(0, 0, 0, 0.75);
    -webkit-box-shadow: 5px 2px 18px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 2px 18px -3px rgba(0,0,0,0.75);
    box-shadow: 5px 2px 18px -3px rgba(0,0,0,0.75);
    height: 100%;
`

export const Container = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    
    ::-webkit-scrollbar {
    display: none;
}
`

export const OpenClose = styled.div`
    background-color: rgba(0, 0, 0, 0.15);
    border-bottom-right-radius: 60%;
    border-top-right-radius: 60%;
    -webkit-box-shadow: 5px 2px 18px -3px rgba(0,0,0,0.55);
    -moz-box-shadow: 5px 2px 18px -3px rgba(0,0,0,0.55);
    box-shadow: 3px 2px 18px -3px rgba(0,0,0,0.55);
    cursor: pointer;
    margin-right: 1rem;
    height: 100vh;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover{
        background-color: rgba(0, 0, 0, 0.3);
        transition: all 300ms;
        box-shadow: 3px 2px 18px -3px rgba(0,0,0,0.75);
    }
`

export const Icon = styled.i`
    margin-left: 10px;
    border-radius: 50%;
    
`
