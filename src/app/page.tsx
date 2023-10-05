import Notifications from '@/components/Notifications'

type HomeProps = {
  env: Env
}

export default function Home({
  env
}: HomeProps) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <Notifications env={env} />
      
    </main>
  )
}

export async function getServerSideProps() {

  const {
    API_KEY,
    APP_ID,
    AUTH_DOMAIN,
    MESSAGING_SENDER_ID,
    PROJECT_ID,
    STORAGE_BUCKET,
  } = process.env

  return {
    props: {
      env: {
        API_KEY,
        APP_ID,
        AUTH_DOMAIN,
        MESSAGING_SENDER_ID,
        PROJECT_ID,
        STORAGE_BUCKET,
      }
    }
  }
}