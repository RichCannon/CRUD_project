import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RoleT } from '../../types/types'

import style from './UserCard.module.css'


type UserCard = {
   userName: string
   email: string
   numOfProfiles: number
   userId: string
   role: RoleT
}

const UserCard: FC<UserCard> = ({ userName, email, numOfProfiles, userId, role }) => {


   return (
      <Link to={{ pathname: `/profiles/${userId}` }} className={style.container}>
         <div className={style.infoText}>{userName}</div>
         <div className={style.infoText}>{email}</div>
         <div className={style.infoText}>{`${numOfProfiles} profiles`}</div>
      </Link>
   )
}

export default UserCard