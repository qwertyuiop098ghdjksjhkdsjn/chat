import Search from "./../Search/Search"
import styles from "./ChatPage.module.css"
import Chats from "./../Chats/Chats"


function ChatPage () {
    return (
        <div className={styles.container}>
        <div className={styles.main}>
        <Search/>
        <Chats/>
        </div>
        </div>
    )
}

export default ChatPage