import React, { useState } from 'react';
import { Button, Modal } from 'antd-mobile'
import './App.css';
import fallacies from './fallacies.json';

function App() {

  const [installModalVisible, setInstallModalVisible] = useState(false)
  const [installEvent, setInstallEvent] = useState<Event>()

  window.addEventListener('appinstalled', (evt) => {
    setInstallModalVisible(false)
  })

  window.addEventListener('beforeinstallprompt', (e) => {
    setInstallEvent(e)
    setInstallModalVisible(true)
  })

  const getRandomNumber = () => {
    return Math.floor(Math.random() * fallacies.length)
  }

  const [randomNumber, setRandomNumber] = useState(getRandomNumber())

  return (
    <div className="App">

      <h1 style={{fontFamily: 'CinzelDecorative'}}>{fallacies[randomNumber].title}</h1>

      <p style={{fontFamily: 'Battambang'}}>{fallacies[randomNumber].description}</p>

      <small style={{fontFamily: 'Battambang'}}>{fallacies[randomNumber].alt}</small> <br/>

      <Button style={{marginTop: 48}} color='default' fill='outline' onClick={() => {
        window.open('https://www.logicallyfallacious.com' + fallacies[randomNumber].url);
      }}>
        Go to detail
      </Button>

      <br/>

      <Button style={{marginTop: 8}} color='primary' fill='none' onClick={(e) => {
        setRandomNumber(getRandomNumber())
      }}>
        Show random
      </Button>

      <Modal 
        visible={installModalVisible}
        title={'Install PWA application'}
        content={<p>Please install app for better user experience.</p>}
        onAction={()=>{}}
        actions={[
          {
            key: 'install', 
            text: 'INSTALL',
            primary: true,
            onClick: () => {
              (installEvent as any)?.prompt()
              setInstallModalVisible(false)
            }
          }, {
            key: 'no', 
            text: 'NO',
            onClick: () => {
              setInstallModalVisible(false)
            }
          }
        ]}
      />
    </div>
  );
}

export default App;
