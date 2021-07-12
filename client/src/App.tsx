import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { AuthContext, UserDataT } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import AppRouter from './AppRouter';
import { useHttp } from './hooks/useHttp';
import { GET_USER_URL } from './types/types';
import Preloader from './components/Preloader/Preloader';
//import './App.css';


const App = () => {

   const { token, login, logout, userId, isReady } = useAuth()
   const isAuth = !!token
   const [userData, setUserData] = useState<UserDataT>({
      userName: ``,
      role: `user`
   })

   const { request } = useHttp()

   useEffect(() => {
      if (userId) {
         (async () => {
            try {

               const user = await request<UserDataT>({
                  url: `${GET_USER_URL}/${userId}`, headers: {
                     authorization: `Bearer ${token}`
                  }
               })
               setUserData({ userName: user.userName, role: user.role })

            } catch (e) {

            }
         })()
      }
   }, [userId])



   if (!isReady) {
      return <Preloader />
   }

   return (
      <AuthContext.Provider value={{
         token, login, logout, userId, isAuth, userData
      }}>
         <BrowserRouter>
            <AppRouter onLogout={logout} isAuth={isAuth} />
         </BrowserRouter>
      </AuthContext.Provider>
   )
}

export default App;
