import { cleanup, fireEvent, render, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import { useState } from 'react'

import MyInput from './MyInput'


const TestMyInput = ({ errorTextInit = `` }) => {

   const [value, setValue] = useState(``)
   const [errorText, setErrorText] = useState(errorTextInit)

   // console.log(errorTextInit)

   const onTextChange = (value) => {
      setValue(value)
      setErrorText(``)
   }
   return (
      <MyInput
         errorText={errorText}
         value={value}
         label={`Test`}
         onTextChange={onTextChange}
      />
   )
}


afterEach(cleanup)

describe('My input', () => {


   it('typing in input', () => {

      const { getByTestId } = render(<TestMyInput />)

      const input = getByTestId(`myInput`)
      const expectedValue = `test`

      expect(input.value).toBe(``)
      userEvent.type(input, expectedValue)
      expect(input.value).toBe(expectedValue)

   })

   it(`press enter when focused on input`, () => {

      const onPressEnter = jest.fn()

      const { getByTestId } = render(<MyInput onEnterPress={onPressEnter} />)

      const input = getByTestId(`myInput`)

      fireEvent.keyPress(input, { key: `Enter`, code: 13, charCode: 13 })

      expect(onPressEnter).toBeCalledTimes(1)

   })


   it(`show error field and clear after change input value`, () => {


      const errorText = 'test error'
      const { getByTestId } = render(<TestMyInput errorTextInit={'test error'} />)

      const input = getByTestId(`myInput`)


      expect(getByTestId(`errorField`).textContent).toBe(errorText)

      userEvent.type(input, `s`)

      expect(getByTestId(`errorField`).textContent).toBe(``)



   })

   // it('text', () => {
   //    const onClick = jest.fn()
   //    render(<MyCheckbox onClick={onClick} label="test text" />)
   //    expect(screen.getByText(/test text/i)).toBeInTheDocument()
   //    expect(screen.queryByText(/null text/i)).not.toBeInTheDocument()
   // })
})