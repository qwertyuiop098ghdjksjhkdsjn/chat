import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./../../fireBase"
import { doc, getDoc, setDoc } from "firebase/firestore";
import styles from "./../Login/Logins.module.css"
import { useNavigate } from "react-router-dom";

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
        
    }

    const navigate = useNavigate();

    function navigation () {
      navigate("/")
    }

    return (

        <div className={styles.main}>
            <button onClick={navigation} className={styles.back}>back to main page</button>
            <form onSubmit={submit}>
                <h1>Sign Up</h1>
                <input placeholder="enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input placeholder="enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder="enter your nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                <button>submit</button>
            </form>
        </div>
)    

}

export default Registration

 