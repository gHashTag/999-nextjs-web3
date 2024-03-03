import React from 'react'
import Image from 'next/image'
import LandingIcons from '@components/assets/LandingIcons'
import Link from 'next/link'

type SubCardProps = {
  title: string
  url: string
  img: string
}

const SubCard: React.FC<SubCardProps> = ({ title, url, img }) => {
  console.log('title', title)
  return (
    <Link href={url}>
      <div className="border rounded-lg border-custom-1 p-4 flex flex-col cursor-pointer hover:bg-[#101114]/50 transition duration-300 ease-in-out">
        <Image
          src={`/images/${img}`}
          alt={title ?? 'landing- card'}
          width={400}
          height={400}
          className="object-contain"
          style={{ marginBottom: '20px' }}
        />
        <div className="flex items-center justify-center">{LandingIcons[title]}</div>
        <div className="flex items-center justify-center text-slate-400 text-sm font-medium mt-2">{title}</div>
      </div>
    </Link>
  )
}
export default React.memo(SubCard)
