import { TResourceType } from '@components/common/GradientCard/GradientCard'
import Image from 'next/image'
import React from 'react'

type ShowcaseCardProps = {
  href: string
  name: string
  desc: string
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ desc, href, name }) => {
  return (
    <div
      onClick={() => window.open(href, '_blank')}
      className="border border-custom-1 p-3.5 rounded-md cursor-pointer flex flex-col hover:bg-custom-1/60 transition-all duration-300 ease-in-out"
      role="presentation"
    >
      <Image
        src={`/docs/showcase/${name}.png`}
        alt={name}
        width={200}
        height={200}
        priority
        quality={100}
        className="object-contain"
      />

      <div className="text-slate-400 text-sm font-semibold my-2">{name}</div>
      <div className="text-sm text-zinc-400 ">{desc}</div>
    </div>
  )
}
export default ShowcaseCard
