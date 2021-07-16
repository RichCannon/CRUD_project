import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import MyButton from '../../components/MyButton/MyButton';
import MyInput from '../../components/MyInput/MyInput';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';
import { LoginResponseT } from '../../types/types';
import style from './LoginPage.module.css';




const LoginPage = () => {


   const validate = useRef(new SimpleReactValidator())

   const auth = useContext(AuthContext)


   const [email, setEmail] = useState(``)
   const [password, setPassword] = useState(``)

   const { request, error, isLoading, clearError, setError } = useHttp()


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

      validate.current.message(`email`, email, `required|email`)
      validate.current.message(`password`, password, `required|min:5`)

      if (validate.current.allValid()) {
         const data = await request<LoginResponseT>({ url: `/api/auth/login`, method: `POST`, body })
         auth.login({ jwtToken: data.token, id: data.userId, createdAt: data.createdAt })
      }
      else {
         setError(validate.current.getErrorMessages())
      }

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
