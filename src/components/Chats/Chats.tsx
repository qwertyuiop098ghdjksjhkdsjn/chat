import styles from "./Chats.module.css"
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../fireBase";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";


interface ChatData {
  [key: string]: { userInfo: {displayName: string; uid: string;}} //[key: string] is used because number of key is numerous
}

interface Element {
  chatId: string,
  userInfo: {displayName: string; uid: string;}
}


function Chats () {

    const {user} = useUser();

    const [chats, setChats] = useState<Element[]>([])

   useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {  //subscribtion on getting the info about changing of chats
      console.log("Current data: ", doc.data());
      const data = doc.data() as ChatData

      const array = [];

      for(const key in data) {
        array.push({
          chatId: key,
          userInfo: data[key].userInfo
        })
      }

      setChats(array);

    });
    return () => {
      unsub();
    };
  }, [user?.uid]);
   
  const navigate = useNavigate()

  const handleSelect = async (chatId: string) => {

    try {
      navigate("/chat/" + chatId);
    } catch (error) {
      console.log(error);
    }

  };


    return (
        <div className={styles.chats}>
            <div>{chats.map((el) => <div onClick={()=>handleSelect(el.chatId)}>{el.userInfo.displayName}</div>)}
            </div>
        </div>
    )
}

export default Chats