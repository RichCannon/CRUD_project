import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import MyButton from '../../components/MyButton/MyButton';
import MyInput from '../../components/MyInput/MyInput';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';
import { LoginResponseT } from '../../types/types';
import style from './LoginPage.module.css';




const LoginPage = () => {


   const auth = useContext(AuthContext)


   const [email, setEmail] = useState(``)
   const [password, setPassword] = useState(``)

   const { request, error, isLoading, clearError } = useHttp()

   useEffect(() => {
      if (error && error[`server`]) {
         alert(error[`server`])
      }
   }, [error])

   const onEmailChange = (value: string) => {
      setEmail(value)
      clearError(`email`)
   }
   const onPasswordChange = (value: string) => {
      setPassword(value)
      clearError(`password`)
   }

   const onButtonClick = async () => {
      const body = { email, password }
      const data = await request<LoginResponseT>({ url: `/api/auth/login`, method: `POST`, body })
      auth.login({ jwtToken: data.token, id: data.userId, createdAt: data.createdAt })
   }





   return (
      <div className={style.container}>
         <div className={style.title}>
            Sign in
         </div>
         <div className={style.inputs}>
            <MyInput name={`email`} label={`Email`} value={email}
               onTextChange={onEmailChange} errorText={error ? error[`email`] : null} />
            <MyInput name={`password`} label={`Password`} value={password}
               onTextChange={onPasswordChange} type={`password`} 
               onEnterPress={onButtonClick}
               errorText={error ? error[`password`] : null} />
         </div>
         <div className={style.button}>
            <MyButton isLoading={isLoading} isDisabled={isLoading} onButtonClick={onButtonClick} label={`Sign In`} />
         </div>
         <Link to={`/register`}>{`Don't have account? Sign up`}</Link>
      </div>
   )
}

export default LoginPage;
