import React, { useRef, useState } from 'react'

import CommonIcons from '@components/assets/CommonIcons'
import { useAccount } from 'wagmi'

import { cn } from '../../helpers/utils'

interface Props {
  text: string
  label: string
}

const KeyStrip: React.FC<Props> = ({ text, label }) => {
  const key = useRef<HTMLSpanElement>(null)
  const [copyDone, setCopyDone] = useState(false)

  const { isConnected } = useAccount()

  const copyToClipboard = async () => {
    if (key.current && isConnected) {
      await navigator.clipboard.writeText(key.current.innerText)
      setCopyDone(true)
      setTimeout(() => {
        setCopyDone(false)
      }, 2000)
    }
  }

  return (
    <div className="w-3/4">
      <span className="font-semibold text-slate-400 mb-2">{label}</span>
      <div className=" bg-[#2D3748] flex  justify-between items-center  rounded-lg shadow-md p-4">
        <span
          ref={key}
          className={cn(
            'blur-sm  transition duration-200 select-none w-fit text-lg font-bold  truncate text-white',
            isConnected ? 'cursor-pointer hover:blur-none' : 'opacity-50'
          )}
        >
          {text.length ? text : 'Some Big Key'}
        </span>
        <button
          className={cn('border p-1 rounded-lg bg-blue-400', copyDone ? 'border-green-300' : 'border-slate-500')}
          onClick={copyToClipboard}
          disabled={copyDone}
        >
          {copyDone ? CommonIcons.copyDone : CommonIcons.copy}
        </button>
      </div>
    </div>
  )
}

export default KeyStrip
