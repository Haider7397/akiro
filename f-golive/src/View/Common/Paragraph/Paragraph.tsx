import { FunctionComponent, PropsWithChildren } from 'react'

export interface IParagraphProps extends PropsWithChildren {
}

export const paragraphClasses = 'text-sm font-normal'

export const Paragraph: FunctionComponent<IParagraphProps> = ({ children }) => {
  return <p className={`${paragraphClasses}`}>{children}</p>
}