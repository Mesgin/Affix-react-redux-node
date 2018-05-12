import React from 'react'
import spinner from './spinner.svg'

export default () => {
  return (
    <div>
      <img 
      src={spinner} 
      alt="Loading..."
      style={{width: '50px', margin: 'auto',marginTop: '50px', display: 'block'}} />
    </div>
  )
}
