import { Modal } from '../Modal'
import { Button } from '../Button'

import styles from './styles.module.scss'

export interface FeedbackModalProps {
  open: boolean
  title: string
  image: React.ReactNode
  action: () => void
  buttonText: string
}

function FeedbackModal({ title, open, image, buttonText, action }: FeedbackModalProps) {
  return (
    <Modal open={open}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>{title}</h2>
        <span>{image}</span>
        <Button onClick={action}>{buttonText}</Button>
      </div>
    </Modal>
  )
}

export default FeedbackModal
