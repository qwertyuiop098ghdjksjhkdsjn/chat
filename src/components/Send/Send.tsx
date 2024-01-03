import { useState } from "react"
import {doc, updateDoc, arrayUnion, Timestamp} from "firebase/firestore"
import { db } from "../../fireBase";
import { v4 as uuid } from "uuid";
import { useUser } from "../../context/UserContext";

interface Props {
    chatID: string;
}


function Send (props: Props) {

    const [input, setInput] = useState("")

    const {user} = useUser()

   async function sendMessage () {
        const ref = doc(db, "chats", props.chatID);

        await updateDoc(ref, {
            messages: arrayUnion({
                uid: uuid(),
                date: Timestamp.now(),
                text: input,
                senderId: user?.uid
            })
        });

        setInput("")
    }

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={sendMessage}>send</button>
        </div>
    )
}

export default Send