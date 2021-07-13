import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { useState } from 'react'

import MyCheckbox from './MyCheckbox'


const TestCheckbox = ({ onClick }) => {

   const [isClicked, setIsClicked] = useState(false)

   return (
      <MyCheckbox isClicked={isClicked} onClick={() => {
         setIsClicked(prev => !prev)
         onClick()
      }} />
   )
}


afterEach(cleanup)

describe('Checkbox', () => {


   it('checked', () => {

      const onClick = jest.fn()
      const { container } = render(<TestCheckbox onClick={onClick} />)

      const checkbox = container.firstChild


      expect(container.firstChild.firstChild.firstChild).toBeNull()
      userEvent.click(checkbox)
      expect(container.firstChild.firstChild.firstChild).not.toBeNull()
      expect(onClick).toHaveBeenCalledTimes(1)

      
   })

   it('text', () => {
      const onClick = jest.fn()
      render(<MyCheckbox onClick={onClick} label="test text" />)
      expect(screen.getByText(/test text/i)).toBeInTheDocument()
      expect(screen.queryByText(/null text/i)).not.toBeInTheDocument()
   })
})