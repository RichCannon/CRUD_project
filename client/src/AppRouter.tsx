import { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './components/Header/Header'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilesPage from './pages/ProfilesPage/ProfilesPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import UsersPage from './pages/UsersPage/UsersPage'
import style from './AppRouter.module.css'

type AppRouterProps = {
   isAuth: boolean
   onLogout: () => void
}

const AppRouter: FC<AppRouterProps> = ({ isAuth, onLogout }) => {


   if (isAuth) {
      return (
         <>
            <Header onLogout={onLogout} />
            <div className={style.container}>
               <Switch>
                  <Route path={`/profiles/:id?`}>
                     <ProfilesPage />
                  </Route>
                  <Route path={`/dashboard`}>
                     <DashboardPage />
                  </Route>
                  <Route path={`/users`}>
                     <UsersPage />
                  </Route>
                  <Redirect to={`/profiles/:id?`} />
               </Switch>
            </div>
         </>
      )
   }

   return (
      <Switch>
         <Route path={`/register`} exact>
            <RegisterPage />
         </Route>
         <Route path={`/login`} exact>
            <LoginPage />
         </Route>
         <Redirect to={`/login`} />
      </Switch>
   )
}

export default AppRouter