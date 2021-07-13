import { render, cleanup } from '@testing-library/react'
import { Router, useLocation } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'

import Header from './Header'
import { AuthContext } from '../../context/AuthContext'

const LocationDisplay = () => {
   const location = useLocation()
   return <div data-testid="location-display">{location.pathname}</div>
}


afterEach(cleanup)

describe(`Header routing`, () => {
   it(`switching on all available NavLink's in Header`, () => {

      const history = createMemoryHistory()
      const { getByTestId } = render(
         <AuthContext.Provider value={{
            userData: { role: `admin` }
         }}>
            <Router history={history}>
               <Header />
               <LocationDisplay />
            </Router>
         </AuthContext.Provider >
      )

      const path = getByTestId(`location-display`)

      const toProfiles = getByTestId(`toProfiles`)
      userEvent.click(toProfiles)
      expect(path.textContent).toBe(`/profiles`)

      const toDashboard = getByTestId(`toDashboard`)
      userEvent.click(toDashboard)
      expect(path.textContent).toBe(`/dashboard`)

      const toUsers = getByTestId(`toUsers`)
      userEvent.click(toUsers)
      expect(path.textContent).toBe(`/users`)

   })
})



