import React from 'react'

import { cn } from '../../../helpers/utils'
import { useRouter } from 'next/router'

type CustomBtnProps = {
  className?: string
  children: React.ReactNode
  url: string
}

const CustomBtn: React.FC<CustomBtnProps> = ({ className, children, url }) => {
  const { push } = useRouter()
  return (
    <button type="button" className={cn(className, 'flex items-center')} onClick={() => push(url)}>
      {children}
    </button>
  )
}
export default CustomBtn
