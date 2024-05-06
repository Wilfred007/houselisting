import React from 'react'
import Header from './_component/Header'

const Provider = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Provider
