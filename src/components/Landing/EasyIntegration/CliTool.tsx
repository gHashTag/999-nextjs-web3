import React from 'react'

import { SquaresPlusIcon } from '@components/assets/SquarePlusIcon'
import GradientCard from '@components/common/GradientCard/GradientCard'

const CliTool = () => {
  const resource = {
    name: 'CLI Tool',
    href: '/tool/cli',
    description: 'Generate Huddle01 infrastructure powered DAPPs in a flash.',
    icon: SquaresPlusIcon,
    pattern: {
      y: 22,
      squares: [[0, 1]]
    }
  }
  return (
    <>
      <div>
        Get started with Huddle01 SDK in minutes using our CLI Tool. Simply clone our example application and customize
        it to fit your specific use case.
      </div>
      <div className="mt-4 not-prose grid md:grid-cols-2 grid-cols-1">
        <GradientCard key={resource.href} resource={resource} />
      </div>
    </>
  )
}

export default CliTool
