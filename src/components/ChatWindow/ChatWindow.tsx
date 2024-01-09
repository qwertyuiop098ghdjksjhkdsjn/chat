import { useParams } from "react-router-dom"
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../fireBase";
import styles from "./ChatWindow.module.css"
interface Message {
    uid: string;
    senderId: string;
    text: string;
    date: Timestamp;
}

function ChatWindow () {

    const {chatID} = useParams()

    const {user} = useUser()

    const[messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if (!user?.uid || !chatID) return;
        const unsub = onSnapshot(doc(db, "chats", chatID), (doc) => {  //subscribtion on getting the info about changing of chats
          console.log("Current data: ", doc.data());

          setMessages(doc.data()?.messages)
    
        });
        return () => {
          unsub();
        };
      }, [user?.uid, chatID]);


    return (
        <div className={styles.container}>{messages.map((el)=> <div className={styles.message + " " + (el.senderId === user?.uid ? styles.right: "")} key={el.uid}>{el.text}</div>)}</div>
    )
}

export default ChatWindow