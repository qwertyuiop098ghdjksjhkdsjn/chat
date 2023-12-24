import { useNavigate } from "react-router-dom"
import styles from "./MainPage.module.css"

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
        </div>
    )
}

export default MainPage