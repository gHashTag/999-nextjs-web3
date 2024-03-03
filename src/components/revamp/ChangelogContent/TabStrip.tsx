import React, { useState } from 'react'

import CommonIcons from '@components/assets/CommonIcons'

type TabStripProps = {
  children: React.ReactNode
  version: string
  date?: string
}

const TabStrip: React.FC<TabStripProps> = ({ children, version, date }) => {
  const [isReadMore, setIsReadMore] = useState<boolean>(false)
  return (
    <div
      className="border border-custom-1 rounded-lg md:p-4 p-2 flex items-start mb-6 justify-between cursor-pointer"
      role="presentation"
      onClick={() => setIsReadMore((prev) => !prev)}
    >
      <div className="flex items-start gap-10 w-full">
        <VersionPill version={version} date={date ?? ''} />

        <div className="text-[#9EA3AE] text-base font-normal lg:w-[80%]  w-[70%]">
          {isReadMore ? children : React.Children.toArray(children)[0]}
        </div>
      </div>
      {/* <button type="button" className="mt-2">
        {CommonIcons[isReadMore ? "chevron-down" : "chevron-right"]}
      </button> */}
    </div>
  )
}
export default React.memo(TabStrip)

interface IVersionPill {
  version: string
  date: string
}

const VersionPill: React.FC<IVersionPill> = ({ version, date }) => (
  <div>
    <div className="bg-custom-1 rounded-md border border-slate-500 py-1 md:px-2.5 px-2 text-slate-400 text-xs font-normal">
      v {version}
    </div>
    <div className="text-[#9EA3AE] text-xs font-normal mt-2">{date}</div>
  </div>
)
