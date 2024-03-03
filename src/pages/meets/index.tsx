import LandingCards from '@components/revamp/LandingCards/LandingCards'
import SubCard from '@/components/revamp/LandingCards/SubCard'
import Layout from '@/components/layout'

const Meets = () => {
  return (
    <Layout>
      <LandingCards title="Get started quickly" type="Guide" className="flex-col mt-10">
        <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 mt-6">
          {[
            { title: 'Video Meeting', url: '/React/react-walkthrough', img: 'Video Meeting.png' },
            { title: 'Audio Spaces', url: '/guides/audio-spaces', img: 'Audio Spaces.png' },
            { title: 'Token-gated Room', url: '/guides/token-gated', img: 'Token-gated Room.png' }
          ].map(({ title, url, img }) => (
            <SubCard key={title} title={title} url={url} img={img} />
          ))}
        </div>
      </LandingCards>
    </Layout>
  )
}

export default Meets
