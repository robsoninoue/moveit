import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

    const { userName, userEmail } = useContext(UserContext)

    const { level } = useContext(ChallengeContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/robsoninoue.png" alt="Robson"/>
            <div>
                <strong>{ userName }</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level { level }
                </p>
            </div>
        </div>
    )
}