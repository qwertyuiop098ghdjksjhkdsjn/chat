import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../fireBase";
import { User } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface IUserContext {
    user: User | null
}

interface Props {
    children: React.ReactNode
}

const UserContext = createContext<IUserContext>({user: auth.currentUser}); 


//эта функция вызывается, при получении пользователя

export function useUser () {
    return useContext(UserContext)
}


export function UserContextProvider ({children}: Props) {

    const [userData, setUserData] = useState(auth.currentUser)

    useEffect ( () => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUserData(user)
        // ...
    } else {
        // User is signed out
        // ...
        setUserData(null)
    }
    });
    },
[] )
    return (
        <UserContext.Provider value={{user: userData}}>{children}</UserContext.Provider>
    )
}