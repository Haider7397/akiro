import { useGetAuthenticatedUser } from 'Flux/Selector'
import { Header } from 'View/Component'
import { PropsWithChildren } from 'react'


interface IProps extends PropsWithChildren {
}

export const PageLayout = ({ children }: IProps) => {

  const authenticatedUser = useGetAuthenticatedUser()
  return (
    <>
    {
      authenticatedUser?<Header/>:null
    }
      <main className='p-2 md:p-6 bg-body-default w-full h-full min-h-screen flex flex-row text-font-default'>
        <div className='relative bottom-0 mx-auto my-0 sm:my-6 md:my-16 lg:my-32 max-w-6xl w-full'>
          {children}
        </div>
      </main>
    </>
  )
}