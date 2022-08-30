import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ExpenseForm from "../expensse/ExpenseForm";
import { authActions } from "../store/auth-reducer";

const WelcomePage = (props) => {

  const dispatch = useDispatch();
  const userIdToken = useSelector(state=>state.auth.idToken);
  const isEmailVerified = useSelector(state=>state.auth.isEmailVerified);
  const APIkey = useSelector(state=>state.auth.apiKey);
  const expenses = useSelector(state=>state.expense.expenses);
  // const totalExpense = Object.keys(expenses).reduce((p , key)=> {return p + Number(expenses[key].cost)},0);

  const [istheme ,setistheme] = useState(false)

  useEffect(() => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${APIkey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: userIdToken,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(authActions.setEmail(data ? data.users[0].email : ""));
        dispatch(authActions.setIsEmailVerified(data ? data.users[0].emailVerified : false));
      });
  },[APIkey, userIdToken, dispatch]);

  const [editprofile, setEditProfile] = useState(false);
  const editProfileClickHandler = () => {
    setEditProfile(true);
  };

  const emailVerifyClickHandler = () => {
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${APIkey}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: userIdToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(`verification email is sent to ${data.email}`);
      })
      .catch((err) => console.log(err));
  };

  const logoutClickHandler = () => {

    // authCtx.logout();
    dispatch(authActions.logout())
  };

  const togglethemehandler =() =>{
      setistheme(true)
  }

  return (
    <Fragment>
      <Fragment>
        <h1>Welcome</h1>
        {/* {totalExpense>10000 && <button>Activate Premium</button>  &&  <button onClick={togglethemehandler}> Toggle Theme </button>} */}

        <button onClick={logoutClickHandler}>Log Out</button>
        {!editprofile && (
          <button
            onClick={editProfileClickHandler}
          >{`Your profile is incomplete \nClick hear to edit`}</button>
        )}
        {editprofile && <Navigate to={"/editprofile"} />}
        <br />
        {!isEmailVerified ? (
          <button onClick={emailVerifyClickHandler}>
            Verify your Email ID
          </button>
        ) : (
          <p>Email Verified</p>
        )}
      </Fragment>
      <div>
        <ExpenseForm />
      </div>
    </Fragment>
  );
};
export default WelcomePage;