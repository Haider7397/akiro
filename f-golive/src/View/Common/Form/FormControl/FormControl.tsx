import React, { PropsWithChildren, ReactNode } from 'react'
import { Icon } from '../../Icon/Icon'
import { Tooltip } from '../../Tooltip/Tooltip'

export interface IFormControlProps extends PropsWithChildren {
  className?: string;
  tooltip?: ReactNode;
}

export const FormControl = ({ children, tooltip }: IFormControlProps) => {
  return (
    <div className='p-2 w-full flex flex-row gap-2'>
      <div className='flex-grow flex-row flex-wrap'>
        {children}
      </div>
      {tooltip && (
        <div className='flex align-bottom items-end'>
          <Tooltip tooltip={tooltip}>
            <Icon type='information-circle-icon' className='h-8 w-8' />
          </Tooltip>
        </div>
      )}
    </div>
  )
}
