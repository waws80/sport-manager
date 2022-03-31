

function iskLogin(unAuthFunc) {
    if (!localStorage.id){
        unAuthFunc();
        return false;
    }
    return true;
}


export default {

    iskLogin,
}