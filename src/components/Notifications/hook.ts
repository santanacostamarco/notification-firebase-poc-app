import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

type NotificationProps = {
  id: string;
  message: string;
  read: boolean
}

export const useNotification = (env: Env) => {
  const [notificationPermitionGranted, setNotifictionPermitionGranted] = useState(false)
  const [notificationHistory, setNotificationHistory] = useState<NotificationProps[]>([])

  const pushNotification = useCallback((notification: NotificationProps) => {
    setNotificationHistory(notificationHistory => [...notificationHistory, notification])
  }, [])

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

  const requestPermition = useCallback(() => {
    if (!notificationPermitionGranted && window.Notification) {
      Notification.requestPermission().then(permition => {
        if (permition === 'granted') {
          setNotifictionPermitionGranted(true)
        }
      })
    }
  }, [notificationPermitionGranted])

  useEffect(() => {
    if (!notificationPermitionGranted && window.Notification) {
      Notification.requestPermission().then(permition => {
        if (permition === 'granted') {
          setNotifictionPermitionGranted(true)
        }
      })
    }
  }, [notificationPermitionGranted])



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
  
  }, [env.API_KEY, env.APP_ID, env.AUTH_DOMAIN, env.MESSAGING_SENDER_ID, env.PROJECT_ID, env.STORAGE_BUCKET, env.VAPID_KEY, pushNotification])

  return {
    notificationPermitionGranted,
    notificationHistory,
    requestPermition,
    setRead,
  }
}