import { useState } from "react"
import {query, collection, where, getDocs,getDoc, doc, updateDoc, setDoc} from "firebase/firestore"
import {db} from "./../../fireBase"
import {UserInfo} from "./../../types/types";
import styles from "./Search.module.css"
import picture from "./../../images/search.svg"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Search () {

    const navigate = useNavigate()


    const [input, setInput] = useState("");

    const [searchedUsers, setSearchedUsers] = useState <UserInfo[]> ([]); 

    //function for search by nickName

    async function search () {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", input)
          );
          
          //query for getting users by nickName

          try {
        const querySnapshot = await getDocs(q);
        let newArray: UserInfo[] = [];
        querySnapshot.forEach((doc) => {
          if (doc.data() !== null) {
            newArray.push(doc.data() as UserInfo);
          }
        });
        console.log("searched users: ", newArray);
        setSearchedUsers(newArray);
      } catch (error) {
        console.log(error);
      }

      setInput("")

    }
    
   const {user: currentUser} = useUser() //information about user from the context

    const handleSelect = async (selectedUser: UserInfo) => {
      if (!currentUser || !searchedUsers) return;
  
      const combinedId =
        currentUser.uid > selectedUser.uid
          ? currentUser.uid + selectedUser.uid
          : selectedUser.uid + currentUser.uid;
  
      try {
        const res = await getDoc(doc(db, "chats", combinedId)); //query to get the information about the chat of 2 users
  
        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), {
            messages: [],
          });
        }
  
        await updateDoc(doc(db, "userChats", currentUser.uid), { //list of chats
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName
          },
          // [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          // [combinedId + ".date"]: serverTimestamp(),
        });
  
       console.log("/chat/" + combinedId)
        navigate("/chat/" + combinedId);
      } catch (error) {
        console.log(error);
      }
  
      setSearchedUsers([]);
      setInput("");
    };


    return (
        <div className={styles.main}>
            <div className={styles.search}>
                <input placeholder="search" value={input} onChange={(e)=> setInput(e.target.value)}/>
            <button onClick={search}><img alt="search" src={picture}/></button>
            </div>
            
            <div className={styles.block}>{searchedUsers.map((el) => <div onClick={()=> handleSelect(el)}>
                <div>{el.displayName}</div>
                <div>{el.email}</div>
                </div>)}</div>
        </div>
    )
} 

export default Search