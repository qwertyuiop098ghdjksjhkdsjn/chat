import { useParams } from "react-router-dom"
import {getDoc, doc} from "firebase/firestore"
import {db} from "./../../fireBase"
import { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext" 
import styles from "./Dialog.module.css"
import Send from "../Send/Send"
import ChatWindow from "../ChatWindow/ChatWindow"
interface CurrentUser {
    uid: string;
    displayName: string;
}


function Dialog () {
    const {chatID} = useParams()
    console.log(chatID)

    const {user} = useUser()

    async function getInfo () {
        if(!chatID || !user) {
            return
        }
        console.log(user?.uid + "." + chatID)
       const res = await getDoc(doc(db, "userChats", user?.uid )); //get list of all chats of current user
       const data = res.data()?.[chatID].userInfo as CurrentUser
       setCurrentUserInfo(data)
       console.log(data)
    }

    const [currentUserInfo, setCurrentUserInfo] = useState<CurrentUser | null>(null);
    
    
    useEffect (
        () => {getInfo()}, [chatID]
    )

    
        if (!chatID) {
            return null
        }
    return (
        <div className={styles.container}>
            <div>{currentUserInfo?.displayName}</div>
            <ChatWindow/>
            <Send chatID={chatID}/>
        </div>
    )
}

export default Dialog