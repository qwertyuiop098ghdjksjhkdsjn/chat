import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../fireBase"

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

    return (
        <div>
            <form onSubmit={logIn}>
                <input placeholder="enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input placeholder="enter your email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button>submit</button>
            </form>
        </div>
    )
}

export default Login