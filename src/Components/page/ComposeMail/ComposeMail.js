import React, { useState, useRef } from "react";
import classes from "./ComposeMail.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useHttp from "../../Hook/useHttp";
import { useSelector, useDispatch } from "react-redux";
import { manageEmailActions } from "../../store/manage-email-reducer";

const ComposeMail = () => {
  const [message, setMessage] = useState();
  const enteredMailAddRef = useRef();
  const enteredSubjectRef = useRef();
  const [error, sendRequest] = useHttp();
  const userMail = useSelector((state) => state.auth.MailBoxId);
  const refHandler = (event) => {
    console.log(event.blocks[0].text);
    setMessage(event.blocks[0].text);
  };
  const dispatch = useDispatch();

  const sendMailHandler = () => {
    const enteredMail = enteredMailAddRef.current.value;
    const enteredSub = enteredSubjectRef.current.value;
    console.log(enteredMail, enteredSub, message, "==>In Compose mail");
    const mail1 = enteredMail.replace("@", "");
    const mail2 = mail1.replace(".", "");
    const dataObj = {
      subject: enteredSub,
      message: message,
      seen:false
    };

    if(enteredMail.trim().length===0)
    {
      alert('Please enter email address')
    }
    else if(!enteredMail.includes('@') || !enteredMail.includes('.') )
    {
      alert('Please enter valid email Id')
    }
    else{
      const resData = () => {
        const responseHandler = (res) => {
          console.log(res.data.name, "==> Resource");
          let emailWithId = { ...dataObj, id: res.data.name };
          dispatch(manageEmailActions.setSendMail(emailWithId));
          alert('Mail Sent')
        };
        sendRequest(
          {
            request: "post",
            url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/sent${userMail}.json`,
            data: dataObj,
            header: { "Content-type": "application/json" },
          },
          responseHandler
        );
      };
  
      sendRequest(
        {
          request: "post",
          url: `https://mail-box-client-2811f-default-rtdb.firebaseio.com/receive${mail2}.json`,
          data: dataObj,
          header: { "Content-type": "application/json" },
        },
        resData
      );
    }
    
  };

  return (
    <React.Fragment>
      <h2>{error}</h2>
      <main className={classes.main}>
        <section className={classes.add_section}>
          <label htmlFor="to">To : </label>
          <input
            ref={enteredMailAddRef}
            type="email"
            id="to"
            placeholder="email address"
          />
        </section>
        <section className={classes.compose_section}>
          <input ref={enteredSubjectRef} type="text" placeholder="subject" />
          {/* <input type="text" placeholder="your message" /> */}
        </section>

        <form>
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            placeholder="    your message"
            editorStyle={{
              border: "1px solid antiquewhite",
              paddingBottom: "145px",
            }}
            onChange={refHandler}
            
          />
        </form>
        <button className={classes.send_button} onClick={sendMailHandler}>
          Send
        </button>
      </main>
    </React.Fragment>
  );
};
export default ComposeMail;

