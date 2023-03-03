import React from "react";
import classes from "./MessageInbox.module.css";
import { useParams ,useHistory} from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import useHttp from "../../Hook/useHttp";
import { manageEmailActions } from "../../store/manage-email-reducer";
const MessageInbox = () => {
  const mails = useSelector((state) => state.mailmanager.receive);
  const userMail=useSelector(state=>state.auth.MailBoxId)
  const { id } = useParams();
  const [error,sendRequest]=useHttp()
  const dispatch=useDispatch()
  const history=useHistory()
  console.log(mails, "==>MESSAGE");
  let arr = mails.find((index) => index.id === id);

  console.log(arr);


  const deleteMailHandler=()=>
  {
    const responseHandler=()=>
    {
      dispatch(manageEmailActions.deleteMail(arr.id))
      alert('Message deleted Successfully')
      history.replace('/mailbox/receiveinbox')
    }

    sendRequest(
      {
        request: "delete",
        url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/receive${userMail}/${arr.id}.json`,
        header: { "Content-type": "application/json" },
      },
      responseHandler
    );
  }

  return (
    <React.Fragment>
      {error && <h2>{error}</h2>}
      <h1 className={classes.heading}>INBOX</h1>
      <main className={classes.main}>
        <h5>{arr ? arr.subject : "loading.."}</h5>
        <p>{arr ? arr.message : "loading.."}</p>
      </main>
      <button className={classes.delete_button} onClick={deleteMailHandler}>Delete Mail</button>
    </React.Fragment>
  );
};

export default MessageInbox;
