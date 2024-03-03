// Assets
import LandingIcons from '@components/assets/LandingIcons'
import Image from 'next/image'
import Link from 'next/link'

type TGetStartedCardProps = {
  title: 'string'
  url: string
}

export const GetStartedCards: React.FC<TGetStartedCardProps> = ({ title, url }) => {
  return (
    <Link href={url}>
      <div className="py-2 px-3 bg-custom-2 rounded-md border-rgb-3 flex items-center justify-between cursor-pointer hover:bg-[#202328]/80 ease-in-out duration-300">
        <div className="flex items-center gap-2">
          <Image src={`/images/${title}.png`} alt={title} width={22} height={22} className="object-contain" />
          <div className="text-sm font-medium text-custom-3">{title}</div>
        </div>

        <div>{LandingIcons['chevronRight-small']}</div>
      </div>
    </Link>
  )
}

export const CLIToolCard = () => {
  return (
    <Link href={'/cli-tool'}>
      <div className="bg-rgb-4 border border-rgb-5 rounded-md flex lg:flex-row flex-col lg:items-center gap-2.5 py-2 px-2.5">
        <div className="flex items-center gap-2.5">
          <span>{LandingIcons.terminal}</span>
          <span className="text-rgb-6 text-xs font-normal">CLI Tool:</span>
        </div>
        <div className="text-rgb-6 text-xs font-normal text-start">
          Clone our example application & customize it to fit your specific use case quickly.
        </div>
      </div>
    </Link>
  )
}

interface LinksIconProps {
  title: string
  linkUrl: string
}

export const LinksIcon: React.FC<LinksIconProps> = ({ title, linkUrl }) => {
  return (
    <Link href={linkUrl}>
      <div className="p-2 bg-custom-2 rounded-md border border-rgb-3 hover:bg-[#202328]/80 ease-out duration-300">
        <Image
          src={`/docs/images/${title}.png`}
          alt={title}
          width={18}
          height={18}
          className="object-contain cursor-pointer"
          key={title}
        />
      </div>
    </Link>
  )
}
