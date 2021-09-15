import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { useEffect } from "react";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";

import { setUser, clearUser } from "./redux/actions/user_action";

function App() {
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  useSelector((state) => console.log(state));
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      //로그인이 된 상태

      if (user) {
        console.log(user);
        history.push("/");
        dispatch(setUser(user));
      } else {
        console.log("none bro");

        history.push("/login");
        dispatch(clearUser());
      }
    });

    return dispatch(clearUser());

    // cleanup
  }, []);

  return isLoading ? (
    <div>...Loading</div>
  ) : (
    <>
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </>
  );
}

export default App;
