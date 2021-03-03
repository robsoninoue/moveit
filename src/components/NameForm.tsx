import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import styles from '../styles/components/EmailForm.module.css'

export function NameForm() {

    const {userName, storeName} = useContext(UserContext)

    const registerName = event => {
        event.preventDefault()
        storeName(event.target.name.value)
    }

    return (
        <form className={styles.emailForm} onSubmit={registerName}>
            <label htmlFor="name">Qual o seu nome?</label>
            <div>
                <input type="text" name="name" id="name" required/>
                <button type="submit"><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
        </form>
    )
}