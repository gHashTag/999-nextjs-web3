import LandingCards from '@components/revamp/LandingCards/LandingCards'
import SubCard from '@/components/revamp/LandingCards/SubCard'
import Layout from '@/components/layout'
import { createRoom } from '@components/createRoom'
import { useRouter } from 'next/navigation'
import { HMSPrebuilt } from '@100mslive/roomkit-react'

const Meets = ({ token }: { token: string }) => {
  console.log('token', token)
  //Prebuilt links are role specific room links with a format https://<template-subdomain>.app.100ms.live/<room-code> where,
  //javascript-videoconf-1844.app.100ms.live/meeting/uve-kjxm-pca
  return (
    <Layout>
      <HMSPrebuilt roomCode="jjv-yfww-zfu" />
    </Layout>
  )
}

export default Meets
