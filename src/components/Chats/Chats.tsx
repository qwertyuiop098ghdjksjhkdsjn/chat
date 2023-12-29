import styles from "./Chats.module.css"

function Chats () {

    return (
        <div className={styles.chats}>
            <div>
                <div>NickName</div>
                <div>LastMessage</div>
            </div>
        </div>
    )
}

export default Chats