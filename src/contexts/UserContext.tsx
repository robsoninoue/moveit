import { Children, createContext, ReactNode, useState } from "react"
import { Welcome } from "../components/Welcome"


interface UserContextData{
    userName: string,
    userEmail: string,
    storeEmail: (emailInserted:string) => void,
    storeName: (emailInserted:string) => void
}

interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
    
    const [isWelcome,setIsWelcome] = useState(true)

    const [userEmail, setUserEmail] = useState(null)
    const [userName,setUserName] = useState(null)

    function storeEmail(emailInserted) {
        console.log(`Dentro do contexto! ${emailInserted}`)
        setUserEmail(emailInserted)
        setIsWelcome(false)
    }

    function storeName(nameInserted) {
        setUserName(nameInserted)
        setIsWelcome(false)
        
    }

    return (
        <UserContext.Provider value = {{
            userEmail,
            userName,
            storeEmail,
            storeName
        }}>
            {children}
            {isWelcome && <Welcome/>}
        </UserContext.Provider>
    )
    
}