import React from "react";
import classes from "./Mailbox.module.css";
import Inbox from "../Inbox/Inbox";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ComposeMail from "../ComposeMail/ComposeMail";
import Welcome from "../Welcome";
import { useParams } from "react-router-dom";
const Mailbox = () => {
  const history = useHistory();

  const receiveMail = useSelector((state) => state.mailmanager.receive);
  const sentMail = useSelector((state) => state.mailmanager.sent);
  console.log(receiveMail);
  const { id } = useParams();
  console.log(id, "==>ID");

  let unSeen = 0;
  receiveMail.forEach((data) => {
    if (data.seen === false) {
      unSeen = unSeen + 1;
    }
  });

  console.log(unSeen, "UNSEEN MESSAGES");

  return (
    <React.Fragment>
      <main className={classes.main}>
        <section className={classes.section}>
          <h4>Your Mail Box</h4>
          <button
            onClick={() => {
              history.push("/mailbox/compose");
            }}
          >
            Compose
          </button>
          <button
            onClick={() => {
              history.push("/mailbox/receiveinbox");
            }}
          >{`Inbox ${unSeen}`}</button>
          <button
            onClick={() => {
              history.push("/mailbox/inbox");
            }}
          >
            Sent
          </button>
        </section>
        <Route path="/mailbox/receiveinbox">
          <section className={classes.inbox_main}>
            {receiveMail.map((mail) => {
              return <Inbox key={mail.id} mails={mail} type={"receive"} />;
            })}
          </section>
        </Route>
        <Route path="/mailbox/compose">
          <ComposeMail />
        </Route>
        <Route path="/mailbox/welcome">
          <Welcome />
        </Route>
        <Route path="/mailbox/inbox">
          <section className={classes.inbox_main}>
            {sentMail.map((mail) => {
              return <Inbox key={mail.id} mails={mail} type={"sent"} />;
            })}
          </section>
        </Route>
      </main>
    </React.Fragment>
  );
};

export default Mailbox;
