import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Login.module.css";

const LogIn = () => {
    
  const loginHandler = async (event) => {
    event.preventDefault();
    const email = event.target.elements["logInEmail"].value;
    const password = event.target.elements["password"].value;

    if (password === "" || password.length < 8) {
      alert(
        `Password cannot be empty \nPassword should be atleast 8 charecters long`
      );
    } else {
   
        fetch(` https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
        AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4`, {
        method: 'POST',
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then( res =>{
              console.log(res);
            //   setIsLoading(false);
              if(res.ok){
                res.json().then((data)=> {
                //   ctx.login(data.idToken)
                //   ctx.token=data.idToken
                //   history.replace('./');
                console.log("login");
                })
              }
              else {
                return res.json().then((data) => {
                  if(data.error.message) alert(data.error.message);
                  else alert('There is an error');
                })
              }
            })
     

      //   console.log(email, password1, password2);
      event.target.elements["logInEmail"].value = "";
      event.target.elements["password"].value = "";
    
  };
}
  return (
    <Fragment>
      <form className={classes.form} onSubmit={loginHandler}>
        <label htmlFor="email">Email</label>
        <br />
        <input id="logInEmail" type="email"></input>
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" type="password"></input>
        <br />
        <button id="logInBtn" type="submit">
          Log In
        </button>
        <br />
      </form>
      
      {/* <NavLink to="/signup">
        Don't have an account?
        <br />
        Click heare to Sign Up
      </NavLink>       */}

    </Fragment>
  );
};

export default LogIn;