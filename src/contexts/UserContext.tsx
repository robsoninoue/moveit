import { PrismaClient } from "@prisma/client"
import { createContext, ReactNode, useState } from "react"
import { Welcome } from "../components/Welcome"


interface UserContextData{
    userName: string,
    userEmail: string,
    storeEmail: (emailInserted:string) => void,
    storeName: (nameInserted:string) => void,
    isEmailFilled: boolean,
    isNameFilled: boolean,
    receivedLevel: number,
    receivedCurrentExperience: number,
    receivedChallengesCompleted: number,
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

    const [receivedLevel, setReceivedLevel] = useState(1)
    const [receivedCurrentExperience, setReceivedCurrentExperience] = useState(0)
    const [receivedChallengesCompleted, setReceivedChallengesCompleted] = useState(0)

    // alert(receivedLevel)

    // async function receivedUserInfo() { await fetch('http://localhost:3000/api/showUser', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify({'email': userEmail})
    // })}

    // const receveidUserData = await receivedUserInfo.json()

    async function storeEmail(emailInserted:string) {

        setUserEmail(emailInserted)
        setIsEmailFilled(false)
    
        const sendMailRequest = await fetch('http://localhost:3000/api/showUser', {
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
            setReceivedLevel(userData.user.level)
            setReceivedCurrentExperience(userData.user.experienceAmount)
            setReceivedChallengesCompleted(userData.user.challengesCompleted)
        }
    }

    async function storeName(nameInserted:string) {
        setUserName(nameInserted)
        await fetch('http://localhost:3000/api/updateUser', {
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
            isNameFilled,
            receivedLevel,
            receivedCurrentExperience,
            receivedChallengesCompleted,
        }}>
            {children}
            {isWelcome && <Welcome/>}
        </UserContext.Provider>
    )
    
}
