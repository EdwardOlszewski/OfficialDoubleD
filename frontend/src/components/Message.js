import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return (
    <Alert
      style={{ marginTop: '3rem', textAlign: 'center', fontSize: '120%' }}
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
