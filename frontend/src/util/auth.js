import { redirect} from "react-router-dom";

export const getTokenDuration =()=>{
    const storedExpiratonDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpiratonDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration ;
}

export const getAuthToken = ()=>{
    let token = localStorage.getItem('token');

    if(!token){
        return;
    }

    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0){
        return "EXPIRED";
    }

    return token;
}

export const tokenLoader = ()=>{
    if(getAuthToken()){
        return getAuthToken() ;
    }
    return null ;
}

export const checkAuthLoader = ()=>{
    console.log("inside loader");
    let token = getAuthToken();
    console.log(token);
    if(!token){
        console.log("inside if")
        return redirect('/auth')
    }
    return null ;
}