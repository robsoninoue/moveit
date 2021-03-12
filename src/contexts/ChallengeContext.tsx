import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'
import { UserContext } from './UserContext'

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    challengesCompleted: number
    experienceToNextLevel: number
    activeChallenge: Challenge
    LevelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
    closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
    children: ReactNode
}

async function updateScore(userEmail:string, level:number, currentExperience:number, challengesCompleted:number) {
    if(userEmail != null) {
        await fetch('/api/updateScore',{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': userEmail,
                'level': level,
                'experienceAmount': currentExperience,
                'challengesCompleted': challengesCompleted
            })
        })
    }
}

export const ChallengeContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children,...rest}:ChallengesProviderProps) {

    const { userEmail, receivedLevel, receivedCurrentExperience, receivedChallengesCompleted } = useContext(UserContext)

    const [session, setSession] = useState(0)
    const [level, setLevel] = useState(receivedLevel)
    const [currentExperience, setCurrentExperience] = useState(receivedCurrentExperience)
    const [challengesCompleted, setChallengesCompleted] = useState(receivedChallengesCompleted)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


    useEffect(()=>{
        Notification.requestPermission()
    },[])

    useEffect(()=>{
        setLevel(receivedLevel)
        setCurrentExperience(receivedCurrentExperience)
        setChallengesCompleted(receivedChallengesCompleted)
    },[receivedCurrentExperience, receivedLevel, receivedChallengesCompleted])

    useEffect(()=>{
        updateScore(userEmail, level, currentExperience, challengesCompleted)
        console.log(session)
    },[session])

    function LevelUp(){
      setLevel(level + 1)
      setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} XP!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            LevelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
        setSession(session+1)
        
    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                experienceToNextLevel,
                LevelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}>
                {children}
                {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}