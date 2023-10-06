"use client";

import { FC } from 'react';
import { useNotification } from './hook';

const Notifications: FC<{env: Env}> = ({env}) => {
  const {
    notificationHistory, 
    notificationPermitionGranted, 
    requestPermition,
    setRead,
  } = useNotification(env)

  return (
    <div> 
      <h1> Notificações </h1>
      {notificationPermitionGranted && <p>
        Permissão concedida para exibir notificações.
      </p>}
      {!notificationPermitionGranted && <div>
        <p>
        Permissão negada para exibir notificações.
        </p>
        <button onClick={requestPermition}>
          Permitir notificações
        </button>
      </div>}
      <ul>
        {notificationHistory.map(notification => (
          <li key={notification.id}>
            {notification.message}
            {notification.read ? " - lida" : ""}
            {!notification.read ? (
              <> {' '}
              <button onClick={() => {
                setRead(notification)
              }}>
                Marcar como Lida
              </button>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  
  )
}

export default Notifications