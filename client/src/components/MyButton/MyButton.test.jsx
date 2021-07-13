import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { useState } from 'react'

import MyButton from './MyButton'


const TestMyButton = ({ onClick }) => {

   const [isLoading, setIsLoading] = useState(false)

   return (
      <MyButton
         isLoading={isLoading}
         isDisabled={false}
         onButtonClick={() => {
            setIsLoading(prev => !prev)
            // setIsDisabled(prev => !prev)
            onClick()
         }}
         label={`TEST`} />
   )
}


afterEach(cleanup)

describe('Button', () => {


   it('loading button', () => {

      const onClick = jest.fn()
      const { container } = render(<TestMyButton onClick={onClick}/>)

      const button = container.firstChild

      expect(screen.getByText(/TEST/i)).toBeInTheDocument()
      userEvent.click(button)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(screen.queryByText(/TEST/i)).not.toBeInTheDocument()


   })

   it('disabled button', () => {
      const onClick = jest.fn()

      const { container } = render(<MyButton onButtonClick={onClick} isDisabled />)

      const button = container.firstChild


      for (let i = 0; i < 6; i++) {
         userEvent.click(button)
      }
      expect(onClick).toHaveBeenCalledTimes(0)
   })

   it('text', () => {
      render(<MyButton label="test text" isLoading={false} />)
      expect(screen.getByText(/test text/i)).toBeInTheDocument()
      expect(screen.queryByText(/null text/i)).not.toBeInTheDocument()
   })

})