import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./../../fireBase"
import { doc, getDoc, setDoc } from "firebase/firestore";

function Registration () {
    
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");

    const submit :React.FormEventHandler<HTMLFormElement> = async (event) => {
        console.log("registration")
        event.preventDefault()
    
    
    const response = await createUserWithEmailAndPassword(auth, email, password)
        
    await updateProfile(response.user, {
      displayName: nickname,
    });

        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          displayName: nickname,
          email,
        });
  
        await setDoc(doc(db, "userChats", response.user.uid), {});
        // ...
    }

    return (

        <div>
            <form onSubmit={submit}>
                <input placeholder="enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input placeholder="enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="enter your nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                <button>submit</button>
            </form>
        </div>
)    

}

export default Registration

 