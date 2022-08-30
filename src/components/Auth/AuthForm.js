import { useState, useRef } from 'react';
// import { useContext  } from 'react';
// import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';
import {  Navigate, NavLink } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import { useSelector ,useDispatch } from 'react-redux';
import { authActions } from '../store/auth-reducer'

const AuthForm = () => {

  // const ctx= useContext(AuthContext)
  const idToken =useSelector( state => state.auth.idToken)

  const dispatch =useDispatch()

  const islogin =useSelector( state => state.auth.login)

  // console.log(ctx);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoginsucess, setIsLoginsucess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isforgot,setisforgot] =useState(false);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    if (isLogin) {
      fetch(` https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
      AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4`, {
        method: 'POST',
              body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then( res =>{
              console.log(res);
              setIsLoading(false);
              if(res.ok){
                res.json().then((data)=> {
            
                  dispatch(authActions.login(data.idToken))
               
                  console.log("hi");
                  setIsLoginsucess(true)

              // {  <Navigate to={"/homepage"} /> }

               
                })
              }
              else {
                return res.json().then((data) => {
                  if(data.error.message) alert(data.error.message);
                  else alert('There is an error');
                })
              }
            })
     

    } else {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4`, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res=>{
        setIsLoading(false);
        if (res.ok) {
          //...
          console.log("hi");
        } else {
          return res.json().then(data => {
            const generalError = 'Authentication failed';
            const errmsg = data.error.message;
            console.log(data);
            if (errmsg) alert(data.error.message)
            else alert(generalError);
          })
        }
      })
    }
  }
  const forgotpass =() =>{
    setisforgot(true);
 }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>sending request ....</p>  }
          { isLoginsucess && <Navigate to={'/welcome'} /> }
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          
          

          <div>

          </div>
        </div>
      </form>
      <button onClick={forgotpass}>Forgotpassword</button>
          { isforgot && <Navigate to={"/forgot"} />}
    </section>
  );
};
export default AuthForm;