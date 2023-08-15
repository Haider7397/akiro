import { ChangeEvent, useCallback } from 'react'
import { Observable, Subject } from 'rxjs'
import { Icon } from 'View/Common'

export interface IFileInputProps {
  onChange$?: Subject<File[]>;
  isValid?: boolean;
  onReset$?: Observable<void>;
  isMultiple: boolean;
  fileType: string;
  fileAccept: string;
  fileCounter: any;
}

export const FileInput = ({
                            onChange$,
                            isValid,
                            isMultiple,
                            fileType,
                            fileCounter,
                            fileAccept,
                          }: IFileInputProps,
) => {

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange$ && onChange$.next(Array.from(event.target.files || []))
      event.target.files = null
    },
    [onChange$],
  )

  return (
    <div className='w-full'>
      <label
        className={`flex justify-center w-full h-32 px-4 transition bg-green-100 border-2 ${isValid === true ? 'border-green-400' : 'border-gray-400'} border-solid rounded-md appearance-none cursor-pointer hover:border-green-400 focus:outline-none`}>
        <div className='flex items-center space-x-2 flex-row'>
          <Icon type='cloud-upload-icon' className='w-20 h-20 stroke-green-400' />
          <p className='text-green-600'>{fileCounter === 0 ? fileType : fileCounter + ' files'}</p>
        </div>
        <input type='file' name='file_upload' className='hidden' accept={fileAccept} onChange={handleOnChange}
               color={isValid === true ? 'success' : isValid === false ? 'error' : 'primary'} multiple={isMultiple} />
      </label>
    </div>
  )
}
