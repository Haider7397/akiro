import { FunctionComponent, PropsWithChildren } from 'react'

export interface IModalProps extends PropsWithChildren {
  isOpen: boolean
}

interface IModalComponents {
  Header: FunctionComponent<PropsWithChildren>
  Body: FunctionComponent<PropsWithChildren>
  Actions: FunctionComponent<PropsWithChildren>
}

export const Modal: FunctionComponent<IModalProps> & IModalComponents = ({ isOpen, children }) => {
  if (!isOpen) {
    return <></>
  }

  return (
    <div className='absolute sm:fixed top-0 left-0 right-0 bottom-0 bg-black/40 p-2 sm:p-6 md:p-32'>
      <div className='bg-white p-2 md:p-24 rounded-xl'>{children}</div>
    </div>
  )
}

Modal.Header = ({ children }) => (
  <div className='mb-4 text-center'>
    <h2 className='text-2xl'>{children}</h2>
  </div>
)
Modal.Body = ({ children }) => <div>{children}</div>
Modal.Actions = ({ children }) => <div className='pt-4 flex justify-end'>{children}</div>
