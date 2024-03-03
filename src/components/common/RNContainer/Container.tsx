import React from 'react'

import RNCard from '@components/Card/RNCard'

import reactNative from '../../Data/reactNative.json'

const Container = () => {
  return (
    <div className="flex justify-around items-center mt-10 w-full">
      {reactNative.map(({ title, url, icon }, i) => (
        <RNCard key={title} title={title} url={url} icon={icon} />
      ))}
    </div>
  )
}

export default Container
