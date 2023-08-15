import { useInteraction } from "Framework/View/Hooks/useInteraction";
import { useEffect, useState } from "react";
import { Observable, delay, merge } from "rxjs";

export interface IMessageBoxViewModel {
    type: 'success' | 'error';
    message: string;
}

export interface IMessageboxProps {
    message$: Observable<IMessageBoxViewModel>;
    messageInterval: number;
}

export const Messagebox = ({ messageInterval, message$ }: IMessageboxProps) => {

    const [currentMessage, setCurrentMessage] = useState<string>('')
    const [type, setType] = useState<string>('')
    const onClose$ = useInteraction<void>()

    useEffect(() => {
        const message$$ = message$.subscribe((data) => {
          setType(data.type)
          setCurrentMessage(data.message)
        })
    
        const messageRemove$$ = merge(
          message$.pipe(delay(messageInterval)),
          onClose$,
        ).subscribe(() => {
          setType('')
          setCurrentMessage('')
        })
        return () => {
          message$$?.unsubscribe()
          messageRemove$$?.unsubscribe()
        }
      }, [messageInterval, message$])
    
    return(
        
        currentMessage?<div className='p-2 flex justify-center items-center'>
            <div className={`w-1/2 border ${type === 'success' ? 'border-green-600 bg-green-100 text-green-600' : 'border-red-600 bg-red-100 text-red-600'} rounded-md p-4 text-center`}>
                <p>{currentMessage}</p>
            </div>
        </div>:null
    )
}