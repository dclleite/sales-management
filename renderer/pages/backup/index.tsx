import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '../../components/Button'
import Head from 'next/head'
import FeedbackModal from '../../components/FeedbackModal'

import styles from './styles.module.scss'

function Backup() {
  const router = useRouter()

  const [screenTexts, setScreenTexts] = useState({
    title: 'Backup e restauração',
    FeedbackTitle: 'Backup restaurado com sucesso',
  })
  const [openModal, setOpenModal] = useState(false)

  function downloadBackup() {
    ;(window.api as any).getFs().then((buffer) => {
      var blob = new Blob([buffer], { type: 'application/backup' })
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      var fileName = 'backup'
      link.download = fileName
      link.click()
    })
  }

  function restore() {
    document.getElementById('btn_file').click()
  }

  async function readFile() {
    const filePath = (document.getElementById('btn_file') as any).files[0].path
    await (window.api as any).writeFs(filePath).then(() => setOpenModal(true))
  }

  return (
    <React.Fragment>
      <Head>
        <title>Backup - Neoplast</title>
      </Head>
      <div className={styles.newClientContainer}>
        <div className={styles.title}>
          <h2>{screenTexts.title}</h2>
        </div>
      </div>
      <div className={styles.mainContainer}>
        <img src='/images/backup.svg' />
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={downloadBackup}>Fazer Backup</Button>
        <Button onClick={restore}>Restaurar Backup</Button>
      </div>

      <input onChange={readFile} type='file' id='btn_file' style={{ display: 'none' }}></input>
      <FeedbackModal
        title={screenTexts.FeedbackTitle}
        image={<img src='/images/customer-successfully-registered.svg' />}
        buttonText='Ok'
        open={openModal}
        action={() => setOpenModal(false)}
      />
    </React.Fragment>
  )
}

export default Backup
