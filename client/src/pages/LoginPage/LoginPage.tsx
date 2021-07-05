import { useState } from 'react';

import MyButton from '../../components/MyButton/MyButton';
import MyInput from '../../components/MyInput/MyInput';
import style from './LoginPage.module.css';

const LoginPage = () => {



   const [email, setEmail] = useState(``)
   const [password, setPassword] = useState(``)


   const onEmailChange = (value: string) => {
      setEmail(value)
   }
   const onPasswordChange = (value: string) => {
      setPassword(value)
   }

   const onButtonClick = () => {

   }





   return (
      <div className={style.container}>
         <div className={style.title}>
           Sign in
         </div>
         <div className={style.inputs}>
            <MyInput label={`Email`} value={email} onTextChange={onEmailChange} />
            <MyInput label={`Password`} value={password} onTextChange={onPasswordChange} type={`password`} />
         </div>
         <div className={style.button}>
            <MyButton onButtonClick={onButtonClick} label={`Sign In`} />
         </div>
      </div>
   )
}

export default LoginPage;
