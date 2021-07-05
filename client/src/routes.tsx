import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

export const useRoutes = (isAuth: boolean) => {

   if (isAuth) {
      return (
         <Switch>
            <Route path={`/profiles/:id`}>
               <LoginPage />
            </Route>
            <Redirect to={`/profiles`} />
         </Switch>
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