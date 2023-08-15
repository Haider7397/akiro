import { ReactNode } from 'react'

export interface ITooltipProps {
  children: ReactNode;
  tooltip?: ReactNode;
}


export const Tooltip = ({ tooltip, children }: ITooltipProps) => {

  return (
    <div className='group relative inline-block flex justify-end cursor-pointer w-fit h-fit'>
      {children}
      {tooltip ?
        <span
          className='invisible z-10 group-hover:visible opacity-0 group-hover:opacity-100 transition bg-black text-white p-1 rounded top-full absolute w-[10rem] xs:w-[16rem] md:w-[32rem] '>
                    {tooltip}
                </span> : null
      }
    </div>
  )

}