import { PrismaClient } from "@prisma/client"
import { createContext, ReactNode, useState } from "react"
import { Welcome } from "../components/Welcome"


interface UserContextData{
    userName: string,
    userEmail: string,
    storeEmail: (emailInserted:string) => void,
    storeName: (nameInserted:string) => void,
    isEmailFilled: boolean,
    isNameFilled: boolean
}

interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {

    const [isWelcome,setIsWelcome] = useState(true)
    const [isEmailFilled, setIsEmailFilled] = useState(true)
    const [isNameFilled, setIsNameFilled] = useState(false)

    const [userEmail, setUserEmail] = useState(null)
    const [userName,setUserName] = useState(null)

    async function storeEmail(emailInserted:string) {

        setUserEmail(emailInserted)
        setIsEmailFilled(false)
    
        const sendMailRequest = await fetch('http://localhost:2000/api/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'email': emailInserted})
        })
    
        const userData = await sendMailRequest.json()

        if (userData.user == null) {
            setIsNameFilled(true)
        } else {
            setUserName(userData.user.name)
            setIsWelcome(false)
        }
    }

    async function storeName(nameInserted:string) {
        setUserName(nameInserted)
        await fetch('http://localhost:2000/api/updateUser', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'email': userEmail, 'name': nameInserted})
        })
        setIsWelcome(false)
    }

    return (
        <UserContext.Provider value = {{
            userEmail,
            userName,
            storeEmail,
            storeName,
            isEmailFilled,
            isNameFilled
        }}>
            {children}
            {isWelcome && <Welcome/>}
        </UserContext.Provider>
    )
    
}
