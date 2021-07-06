import {  useState,useContext } from 'react';

import MyButton from '../../components/MyButton/MyButton';
import MyCheckbox from '../../components/MyCheckbox/MyCheckbox';
import MyInput from '../../components/MyInput/MyInput';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';
import style from './RegisterPage.module.css';

const LoginPage = () => {

   const auth = useContext(AuthContext)

   const { isLoading, request, error, clearError } = useHttp()

   const [userName, setUserName] = useState(``)
   const [email, setEmail] = useState(``)
   const [password, setPassword] = useState(``)
   const [isClicked, setIsClicked] = useState(false)



   const onUsernameChange = (value: string) => {
      setUserName(value)
      clearError(`userName`)
   }
   const onEmailChange = (value: string) => {
      setEmail(value)
      clearError(`email`)
   }
   const onPasswordChange = (value: string) => {
      setPassword(value)
      clearError(`password`)
   }

   const onButtonClick = async () => {
      try {

         const body = { email, password, userName, role: isClicked ? `admin` : `user` }


         const data = await request({ url: `/api/auth/register`, method: `POST`, body })

      } catch (e) {

      }
   }

   const onCheckboxClick = () => {
      setIsClicked(!isClicked)
   }






   return (
      <div className={style.container}>
         <div className={style.title}>
            Create your account
         </div>
         <div className={style.inputs}>
            <MyInput name={`userName`} label={`Username`} value={userName}
               onTextChange={onUsernameChange} errorText={error ? error[`userName`] : null} />
            <MyInput name={`email`} label={`Email`} value={email}
               onTextChange={onEmailChange} errorText={error ? error[`email`] : null} />
            <MyInput name={`password`} label={`Password`} value={password}
               onTextChange={onPasswordChange} type={`password`} errorText={error ? error[`password`] : null} />
         </div>
         <div className={style.checkbox}>
            <MyCheckbox onClick={onCheckboxClick} isClicked={isClicked} label={`is admin`} />
         </div>
         <div className={style.button}>
            <MyButton onButtonClick={onButtonClick} label={`Sign Up`} isDisabled={isLoading} />
         </div>
      </div>
   )
}

export default LoginPage;
