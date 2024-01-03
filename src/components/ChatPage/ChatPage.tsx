import Search from "./../Search/Search"
import styles from "./ChatPage.module.css"
import Chats from "./../Chats/Chats"
import Dialog from "../Dialog/Dialog"

function ChatPage () {
    return (
        <div className={styles.container}>
        <div className={styles.main}>
        <Search/>
        <Chats/>
        </div>
        <Dialog/>
        </div>
    )
}

export default ChatPage