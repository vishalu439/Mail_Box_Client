import React from "react";
import classes from "./Inbox.module.css";
import { NavLink } from "react-router-dom";
import useHttp from "../../Hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { manageEmailActions } from "../../store/manage-email-reducer";
const Inbox = (prop) => {
  const [error, sendRequest] = useHttp();
  const userMail = useSelector((state) => state.auth.MailBoxId);
  const dispatch = useDispatch();
  console.log(prop, "==>inside inbox");
  const removeSeenHandler = () => {
    const dataObj = {
      seen: true,
    };
    const responseHandler = (res) => {
      if (prop.type === "receive") {
        dispatch(manageEmailActions.seenMessage(prop.mails.id));
      } else {
        dispatch(manageEmailActions.seenSentMessageHandler(prop.mails.id));
      }

      console.log(res);
    };
    sendRequest(
      {
        request: "patch",
        url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/${prop.type}${userMail}/${prop.mails.id}.json`,
        data: dataObj,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  };

  console.log(error);

  return (
    <React.Fragment>
      <main className={classes.main}>
        <ul>
          <li className={classes.list}>
            <NavLink
              onClick={removeSeenHandler}
              style={{
                backgroundColor: prop.mails.seen === false ? "lightgreen" : "white",
              }}
              to={`/${prop.type}message/${prop.mails.id}`}
            >
              {prop.mails.message}
            </NavLink>
          </li>
        </ul>
      </main>
    </React.Fragment>
  );
};
export default Inbox;
