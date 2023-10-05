import Notifications from '@/components/Notifications'
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next'


export default function Home() {

  const {
    API_KEY,
    APP_ID,
    AUTH_DOMAIN,
    MESSAGING_SENDER_ID,
    PROJECT_ID,
    STORAGE_BUCKET,
    VAPID_KEY,
  } = process.env

  const env = {
    API_KEY,
    APP_ID,
    AUTH_DOMAIN,
    MESSAGING_SENDER_ID,
    PROJECT_ID,
    STORAGE_BUCKET,
    VAPID_KEY,
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Notifications env={env} /> 
    </main>
  )
}

