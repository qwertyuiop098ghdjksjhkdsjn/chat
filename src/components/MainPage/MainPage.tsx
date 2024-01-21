import { useNavigate } from "react-router-dom"
import styles from "./MainPage.module.css"
import image from "./../../images/main.webp"


function MainPage () {
    
    const navigate = useNavigate();

    function signUp () {
        navigate("/signUp")
    }

    function signIn () {
        navigate("/signIn")
    }
    
    
    return (
        <div className={styles.main}>
            <header className={styles.header}>
                <button onClick={signUp}>Sign Up</button>
                <button onClick={signIn}>Sign In</button>
            </header>
           <div className={styles.container}>
            <img alt="phone" className={styles.image} src={image}/>
            <div className={styles.text}>
                <h1>Chat</h1>
                <p>
                    This chat allows to send real-time messages to people. It has such fields as registrations, authorization. In order to try 
                    the conversation you may write "test" in search input. 
                </p>
            </div>
           </div>
        </div>
    )
}

export default MainPage