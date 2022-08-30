import React ,{ useRef } from 'react'
import { useDispatch ,useSelector } from 'react-redux/es/exports';

const ForgotPassword = () => {

    const dispatch =useDispatch()
    
    const email = useRef();

    
    const forgotpasswordhandler = (event) =>{
        event.preventDefault();

        const email = event.target.elements["email"].value;
        
        console.log("clicked");
        console.log(email);
    fetch( `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=
    AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4` ,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            requestType: "PASSWORD_RESET",
                email: email,
        }),
    }).then ( res => {
        console.log(res)
    }).catch(err=>{console.log(err)});
}




  return (
    <>
    <div>
        <form onSubmit={forgotpasswordhandler}>
            <p>Enter E-Mail</p>
            <input type="text" id="email" ref={email}/>
            <button>Send Link</button>
        </form>
    </div>
    </>
  )
}

export default ForgotPassword;