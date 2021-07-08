
import style from './ContentModalProfile.module.css'
import MyCheckbox from "../MyCheckbox/MyCheckbox"
import MyInput from "../MyInput/MyInput"
import {  RoleT } from '../../types/types'
import { FC } from 'react'
import ModalButton from '../ModalButton/ModalButton'


type ContentModalUserProps = {
   onUserNameChange: (value: string) => void
   onRoleChange: (value: RoleT) => void
   onEmailChange: (value: string) => void
   onAcceptClick: () => void
   onDeclineClick: () => void
   userName: string
   role: RoleT
   email: string
   errorUserName?: string | null
   errorEmail?: string | null
   isLoading: boolean
}


const ContentModalUser: FC<ContentModalUserProps> = ({
   onUserNameChange,
   onRoleChange,
   onEmailChange,
   onAcceptClick,
   onDeclineClick,
   userName,
   role,
   email,
   isLoading,
   errorUserName = null,
   errorEmail = null,
}) => {
   return (<>
      <MyInput errorText={errorUserName} value={userName} onTextChange={onUserNameChange} label={`user name:`} />
      <MyInput errorText={errorEmail} value={email} onTextChange={onEmailChange} label={`email:`} />
      <div className={style.genderWrapper}>
         <div className={style.checkboxLabel}>{`role:`}</div>
         <div className={style.checkboxWrapper}>
            <MyCheckbox isRound label={`user`} isClicked={role === `user`} onClick={() => onRoleChange(`user`)} />
            <MyCheckbox isRound label={`admin`} isClicked={role === `admin`} onClick={() => onRoleChange(`admin`)} />
         </div>
      </div>
      <ModalButton onAcceptClick={onAcceptClick} onDeclineClick={onDeclineClick} isLoading={isLoading} />
   </>
   )
}

export default ContentModalUser