import { manageEmailActions } from "../store/manage-email-reducer";
import axios from "axios";
export const ActionCreater = (userEmail) => {
  console.log("ACTION");
  return async (dispatch) => {
    const fetchData = async () => {
      try {
        let res = await axios.get(
          `https://mail-box-client-2811f-default-rtdb.firebaseio.com/receive${userEmail}.json`
        );
        console.log(res, "==>ACTIONS");
        dispatch(manageEmailActions.setReceiveMail(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  };
};


 export const ActionForSentMail=(userEmail)=>
{
  return async(dispatch)=>
  {
    const fetchData=async()=>
    {
      try{
        let res=await axios.get(`https://mail-box-client-2811f-default-rtdb.firebaseio.com/sent${userEmail}.json`)
        dispatch(manageEmailActions.setSentServerMail(res.data)  )
      }
      catch(err)
      {
        console.log(err)
      }
    }

    fetchData();
    
  }
}
