import { redirect } from "react-router-dom"

export const logoutAction = ()=>{
    console.log("inside logout action")
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return redirect("/")
}