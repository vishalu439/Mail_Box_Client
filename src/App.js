import "./App.css";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import React, { useEffect,Suspense } from "react";
//import Auth from "./Components/Auth/Auth";
//import Mailbox from "./Components/page/Mail/Mailbox";
import { Route, Switch } from "react-router-dom";
//import MessageInbox from "./Components/page/MessageInbox/MessageInbox";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreater } from "./Components/store/store-actions";
import { ActionForSentMail } from "./Components/store/store-actions";
//import SentBox from "./Components/page/SentBox/SentBox";
import Loading from "./Components/Layout/UI/Loading";
const Auth=React.lazy(()=>import("./Components/Auth/Auth"))
const Mailbox=React.lazy(()=>import("./Components/page/Mail/Mailbox"))
const MessageInbox=React.lazy(()=>import("./Components/page/MessageInbox/MessageInbox"))
const SentBox=React.lazy(()=>import("./Components/page/SentBox/SentBox"))

function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.MailBoxId);
  useEffect(() => {
    let id = setInterval(() => {
      console.log("CALLING INTERVAL")
      dispatch(ActionCreater(userEmail));
      dispatch(ActionForSentMail(userEmail))
    }, 2000);
    return(()=>clearInterval(id))
  }, []);

  dispatch(ActionForSentMail(userEmail));
  return (
    <React.Fragment>
      <Header />
      <Suspense fallback={<Loading>Loading...</Loading>} >
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/mailbox/:id">
          <Mailbox />
        </Route>

        <Route path="/receivemessage/:id">
          <MessageInbox />
        </Route>
        <Route path="/sentmessage/:id">
          <SentBox />
        </Route>
      </Switch>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default App;
