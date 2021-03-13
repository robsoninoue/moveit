import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/components/Loading.module.css'

export function Loading() {

        return (
            <div className={styles.loading}>
                <FontAwesomeIcon icon={faSync} size="3x" spin/>
            </div>
    )
}