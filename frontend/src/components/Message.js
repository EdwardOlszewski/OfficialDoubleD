import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, color }) => {
  let backgroundColor = 'gray'

  if (color) {
    backgroundColor = color
  }

  return (
    <Alert
      style={{
        marginTop: '3rem',
        textAlign: 'center',
        fontSize: '120%',
        backgroundColor: backgroundColor,
        color: 'white',
      }}
      variant={variant}
    >
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
