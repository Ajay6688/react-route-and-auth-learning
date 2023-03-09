import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

function AuthenticationPage() {
  return <AuthForm />;
}

export const action = async({request})=>{
  
  const searchParam =new URL(request.url).searchParams || 'login';
  const mode = searchParam.get('mode');
  const data = await request.formData();
  const authData = {
    email : data.get('email') ,
    password : data.get('password')
  }

  try {
    let url = 'http://localhost:8080/'+mode ;
    console.log(url)
    const response = await axios.post(url , authData)

    console.log(response);

    localStorage.setItem("token" , response.data.token)

    const expiration = new Date();
    // console.log(expiration);
    expiration.setHours(expiration.getHours() + 1)
    // console.log(expiration);
    localStorage.setItem('expiration' , expiration.toISOString());

    return redirect('/');
    
  } catch (error) {
    console.log(error.response)

    if(error.response.status === 422){
      return error.response.data 
    }
    
    throw json({
      status  : error.status ,
      message  : error.message
    })
  }
}

export default AuthenticationPage;