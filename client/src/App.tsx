import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import { useAuth } from './hooks/useAuth';
import AppRouter from './AppRouter';
//import './App.css';

const App = () => {

   const { token, login, logout, userId } = useAuth()
   const isAuth = !!token



   return (
      <AuthContext.Provider value={{
         token, login, logout, userId, isAuth
      }}>
         <BrowserRouter>
            <AppRouter onLogout={logout} isAuth={isAuth} />
         </BrowserRouter>
      </AuthContext.Provider>
   )
}

export default App;
