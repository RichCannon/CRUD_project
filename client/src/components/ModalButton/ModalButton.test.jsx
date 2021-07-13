import { cleanup,  render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import ModalButton from './ModalButton'




afterEach(cleanup)

describe('Modal Button', () => {
   it(`test on accept click`, () => {

      const onAcceptClick = jest.fn()

      const { getByTestId } = render(<ModalButton onAcceptClick={onAcceptClick} />)

      const button = getByTestId(`acceptButton`)

      for (let i = 0; i < 6; i++) {
         userEvent.click(button)
      }

      expect(onAcceptClick).toHaveBeenCalledTimes(6)

   })

   it(`test on decline click`, () => {

      const onDeclineClick = jest.fn()

      const { getByTestId } = render(<ModalButton onDeclineClick={onDeclineClick} />)

      const button = getByTestId(`declineButton`)

      for (let i = 0; i < 6; i++) {
         userEvent.click(button)
      }

      expect(onDeclineClick).toHaveBeenCalledTimes(6)

   })

})