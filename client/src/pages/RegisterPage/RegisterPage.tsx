import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import MyButton from '../../components/MyButton/MyButton';
import MyCheckbox from '../../components/MyCheckbox/MyCheckbox';
import MyInput from '../../components/MyInput/MyInput';
import { useHttp } from '../../hooks/useHttp';
import style from './RegisterPage.module.css';

const LoginPage = () => {

   const history = useHistory()

   const validate = useRef(new SimpleReactValidator())

   const { isLoading, request, error, clearError ,setError} = useHttp()

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


      validate.current.message(`userName`, userName, `required|min:5`)
      validate.current.message(`email`, email, `required|email`)
      validate.current.message(`password`, password, `required|min:5`)

      if (validate.current.allValid()) {
         const body = { email, password, userName, role: isClicked ? `admin` : `user` }
         await request({ url: `/api/auth/register`, method: `POST`, body })
         alert(`Account succesfuly created! Please login`)
         history.push('/login')
      }
      else {
         setError(validate.current.getErrorMessages())
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
            <MyInput type={`email`} name={`email`} label={`Email`} value={email}
               onTextChange={onEmailChange} errorText={error ? error[`email`] : null} />
            <MyInput name={`password`} label={`Password`} value={password} onEnterPress={onButtonClick}
               onTextChange={onPasswordChange} type={`password`} errorText={error ? error[`password`] : null} />

         </div>
         <div className={style.checkbox}>
            <MyCheckbox onClick={onCheckboxClick} isClicked={isClicked} label={`is admin`} />
         </div>
         <div className={style.button}>
            <MyButton isLoading={isLoading} onButtonClick={onButtonClick} label={`Sign Up`} isDisabled={isLoading} />
         </div>

         <Link to={`/login`}>{`Already have account? Sign in`}</Link>
      </div>
   )
}

export default LoginPage;
