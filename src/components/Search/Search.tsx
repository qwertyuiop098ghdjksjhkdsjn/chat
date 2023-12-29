import { useState } from "react"
import {query, collection, where, getDocs} from "firebase/firestore"
import {db} from "./../../fireBase"
import {UserInfo} from "./../../types/types";
import styles from "./Search.module.css"
import picture from "./../../images/search.svg"

function Search () {

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

    

    return (
        <div>
            <div className={styles.search}>
                <input placeholder="search" value={input} onChange={(e)=> setInput(e.target.value)}/>
            <button onClick={search}><img alt="search" src={picture}/></button>
            </div>
            
            <div>{searchedUsers.map((el) => <div>
                <div>{el.displayName}</div>
                <div>{el.email}</div>
                </div>)}</div>
        </div>
    )
} 

export default Search