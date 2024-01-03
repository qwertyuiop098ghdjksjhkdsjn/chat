import { useParams } from "react-router-dom"
import {getDoc, doc} from "firebase/firestore"
import {db} from "./../../fireBase"
import { useEffect, useState } from "react"

interface CurrentUser {
    uid: string;
    displayName: string;
}


function Dialog () {
    const {chatID} = useParams()
    console.log(chatID)

    async function getInfo () {
        if(!chatID) {
            return
        }
       const res = await getDoc(doc(db, "userChats", chatID)); 
       const data = res.data()?.userInfo as CurrentUser
       setCurrentUserInfo(data)
       console.log(data)
    }

    const [currentUserInfo, setCurrentUserInfo] = useState<CurrentUser | null>(null);
    
    
    useEffect (
        () => {getInfo()}, [chatID]
    )

    

    return (
        <div>{currentUserInfo?.displayName}</div>
    )
}

export default Dialog