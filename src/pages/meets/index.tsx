import LandingCards from '@components/revamp/LandingCards/LandingCards'
import SubCard from '@/components/revamp/LandingCards/SubCard'
import Layout from '@/components/layout'
import { createRoom } from '@components/createRoom'
import { useRouter } from 'next/navigation'

const Meets = () => {
  const router = useRouter()
  const getRoom = async () => {
    const roomId = await createRoom()
    console.log('roomId', roomId)
    router.push(`/meets/${roomId}`)
  }

  return (
    <Layout>
      <LandingCards title="Get started quickly" type="Guide" className="flex-col mt-10">
        <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
          {[
            { title: 'Video Meeting', url: '/meets', img: 'Video Meeting.png' },
            { title: 'Audio Spaces', url: '/audio-spaces', img: 'Audio Spaces.png' },
            { title: 'Token-gated Room', url: '/guides/token-gated', img: 'Token-gated Room.png' }
          ].map(({ title, url, img }) => (
            <SubCard key={title} title={title} img={img} onClick={getRoom} />
          ))}
        </div>
      </LandingCards>
    </Layout>
  )
}

export default Meets
