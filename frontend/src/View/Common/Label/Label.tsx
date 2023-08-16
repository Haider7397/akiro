import React, { PropsWithChildren } from 'react'

export interface ILabelProps extends PropsWithChildren {
  type?: 'bright' | 'secondary'
}

export const Label = ({ children, type }: ILabelProps) => {
  const secondary = `${type === 'secondary' ? 'text-secondary' : ''}`
  const bright = `${type === 'bright' ? 'text-primary-content' : ''}`

  return (
    <label className='label'>
      <span className={`label-text ${secondary} ${bright}`}>{children}</span>
    </label>
  )
}
