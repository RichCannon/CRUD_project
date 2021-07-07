import { FC } from 'react'

import style from './UserCard.module.css'


type UserCard = {
   userName: string
   email: string
   numOfProfiles: number
   onCardClick: () => void
}

const UserCard: FC<UserCard> = ({ userName, email, numOfProfiles, onCardClick }) => {
   return (
      <div onClick={onCardClick} className={style.container}>
         <div className={style.infoText}>{userName}</div>
         <div className={style.infoText}>{email}</div>
         <div className={style.infoText}>{`${numOfProfiles} profiles`}</div>
      </div>
   )
}

export default UserCard