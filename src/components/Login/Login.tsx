import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../fireBase"
import styles from "./Logins.module.css"
import { useNavigate } from "react-router-dom";

function Login () {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const logIn :React.FormEventHandler<HTMLFormElement> = (event) => {
        console.log("login!")
        event.preventDefault()


signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

    }

    const navigate = useNavigate();

    function navigation () {
      navigate("/")
    }

    return (
        <div className={styles.main}>
          <button onClick={navigation} className={styles.back}>back to main page</button>
            <form onSubmit={logIn}>
                <h1>Log In</h1>
                <input placeholder="enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input placeholder="enter your email" type="email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default Login