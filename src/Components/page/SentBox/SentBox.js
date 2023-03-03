import React from "react";
import classes from "../MessageInbox/MessageInbox.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SentBox = () => {
  const mails = useSelector((state) => state.mailmanager.sent);
  const { id } = useParams();
  let arr = mails.find((index) => index.id === id);

  return (
    <React.Fragment>
      <h1 className={classes.heading}>SENT</h1>
      <main className={classes.main}>
        <h5>{arr ? arr.subject : "loading.."}</h5>
        <p>{arr ? arr.message : "loading.."}</p>
      </main>
    </React.Fragment>
  );
};
export default SentBox;
