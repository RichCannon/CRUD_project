import { useState } from 'react';

import MyButton from '../../components/MyButton/MyButton';
import MyCheckbox from '../../components/MyCheckbox/MyCheckbox';
import MyInput from '../../components/MyInput/MyInput';
import { useHttp } from '../../hooks/useHttp';
import style from './RegisterPage.module.css';

const LoginPage = () => {


   const { isLoading, request, error } = useHttp()

   const [userName, setUserName] = useState(``)
   const [email, setEmail] = useState(``)
   const [password, setPassword] = useState(``)
   const [isClicked, setIsClicked] = useState(false)


   const onUsernameChange = (value: string) => {
      setUserName(value)
   }
   const onEmailChange = (value: string) => {
      setEmail(value)
   }
   const onPasswordChange = (value: string) => {
      setPassword(value)
   }

   const onButtonClick = async () => {
      try {

         const body = { email, password, userName, role: isClicked ? `admin` : `user` }

         console.log(`Request body: `, body)
         
         const data = await request({ url: `/api/auth/register`, method: `POST`, body })

         console.log(`Response data`, data)
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
            <MyInput label={`Username`} value={userName} onTextChange={onUsernameChange} />
            <MyInput label={`Email`} value={email} onTextChange={onEmailChange} />
            <MyInput label={`Password`} value={password} onTextChange={onPasswordChange} type={`password`} />
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
