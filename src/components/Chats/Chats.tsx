import styles from "./Chats.module.css"
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../fireBase";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";

function Chats () {

    const {user} = useUser();

    const [chats, setChats] = useState([])

   useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
      console.log("Current data: ", doc.data());
      setChats(doc.data() || []);
    });
    return () => {
      unsub();
    };
  }, [user?.uid]);
   

    return (
        <div className={styles.chats}>
            <div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Chats