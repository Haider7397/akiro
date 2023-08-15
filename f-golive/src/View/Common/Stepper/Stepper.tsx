import { useMemo } from 'react'

export interface IStepperProps {
  steps: string [];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: IStepperProps) => {
  const stepperSteps = useMemo(() => steps.map((step, index: number) => ({
    description: step,
    completed: index < currentStep,
    highlighted: index === currentStep,
    selected: index === currentStep,
  })), [steps, currentStep])

  return (
    <div className='hidden mx-4 p-4 xs:flex justify-between items-center'>
      {stepperSteps.map((step, index) => (
        <div key={index}
             className={index !== stepperSteps.length - 1 ? 'w-full flex items-center' : 'flex items-center'}>
          <div className='relative flex flex-col items-center text-teal-600'>
            <div
              className={`rounded-full transition duration-500 ease-in-out border-2 ${step.completed || step.selected ? 'border-green-600' : 'border-gray-300'} h-12 w-12 flex items-center justify-center py-3  ${step.completed ? 'bg-green-600 text-white font-bold' : ''} ${step.highlighted ? 'bg-green-300 text-white font-bold' : ''}`}>
              <span className={`font-bold text-xl ${step.selected ? 'text-white' : 'text-gray-300'}`}>{index + 1}</span>
            </div>
            <div
              className={`absolute top-0 whitespace-break-spaces text-center mt-16 w-32 text-xs font-medium uppercase ${step.completed || step.highlighted ? 'text-green-600' : 'text-gray-400'}`}>{step.description}</div>
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out ${step.completed ? 'border-green-600' : 'border-gray-300'}`}></div>
        </div>
      ))}
    </div>
  )
}