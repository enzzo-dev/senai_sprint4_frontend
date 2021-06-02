 export const parseJwt = () => {
    //recebe o token do usuário prestes a se logar
    let base64 = localStorage.getItem('usuario-login').split('.')[1]


    return JSON.parse(window.atob(base64))

}
