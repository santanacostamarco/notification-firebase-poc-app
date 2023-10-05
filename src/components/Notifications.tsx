"use client";

import { FC, useCallback, useEffect, useState } from 'react';
// import io from 'socket.io-client'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

import icon from '@/app/favicon.ico'

type NotificationProps = {
  id: string;
  message: string;
  read: boolean
}

const Notifications: FC<{env: Env}> = ({env}) => {
  // const [messaging, setMessaging] = useState<Messaging|null>(null)
  const pushNotification = useCallback((notification: NotificationProps) => {
    setNotificationHistory(notificationHistory => [...notificationHistory, notification])
  }, [])

  const [notificationPermitionGranted, setNotifictionPermitionGranted] = useState(false)
  const [notificationHistory, setNotificationHistory] = useState<NotificationProps[]>([])

  const setRead = useCallback((notification: NotificationProps) => {
    setNotificationHistory(notificationHistory => notificationHistory.map(_notification => {
      if (notification.id === _notification.id) {
        return {
          ..._notification, 
          read: true
        }
      } 
      return _notification
    }))
  }, [])

  useEffect(() => {
    const app = initializeApp({
      apiKey: env.API_KEY,
      authDomain: env.AUTH_DOMAIN,
      projectId: env.PROJECT_ID,
      storageBucket: env.STORAGE_BUCKET,
      messagingSenderId: env.MESSAGING_SENDER_ID,
      appId: env.APP_ID
    });

    const messaging = getMessaging(app)

    // setMessaging(messaging)

    getToken(messaging, {vapidKey: env.VAPID_KEY})
    .then((token) => {
      console.log("🚀 ~ file: Notifications.tsx:34 ~ getToken ~ token:", token)
    })

    onMessage(messaging, (payload) => {
      pushNotification({
        id: payload.messageId,
        message: payload.notification?.body || '',
        read: false
      })
    });

    onBackgroundMessage(messaging, (payload) => {
      pushNotification({
        id: payload.messageId,
        message: payload.notification?.body || '',
        read: false
      })
    })

  
  }, [env.API_KEY, env.APP_ID, env.AUTH_DOMAIN, env.MESSAGING_SENDER_ID, env.PROJECT_ID, env.STORAGE_BUCKET, env.VAPID_KEY, pushNotification])

    
  

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
        <button>
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