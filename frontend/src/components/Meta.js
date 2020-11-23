import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To The NeonMeg Shop',
  description: 'I make and sell Pearl Bead Items',
  keywords: 'Pokemon, Video Games, Sonic, Pearl Bead ',
}

export default Meta
