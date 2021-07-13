
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CreateProfileModal from './CreateProfileModal'


afterEach(cleanup)

describe('My input', () => {
   it(`check onDismiss function call when pressed outside the modal content`, () => {
      const onDismissClick = jest.fn()

      const { getByTestId } = render(<CreateProfileModal onDismissClick={onDismissClick} />)

      const container = getByTestId(`modalContainer`)
      const content = getByTestId(`modalContent`)

      userEvent.click(content)

      expect(onDismissClick).toBeCalledTimes(0)

      userEvent.click(container)
      expect(onDismissClick).toBeCalledTimes(1)

   })
})