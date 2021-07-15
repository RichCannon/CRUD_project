
import { FC } from 'react'
import { msToBirthdate } from '../../utils/birtdateToMs'

import style from './ProfileCard.module.css'

type ProfileCardProps = {
   onEditPress: () => void
   onDeletePress: () => void
   data: {
      name: string,
      gender: `male` | 'female'
      birthdate: string
      city: string
   }
}

const ProfileCard: FC<ProfileCardProps> = ({ onEditPress, onDeletePress, data: { name, gender, birthdate, city } }) => {


   return (
      <div className={style.container}>
         <div className={style.infoWrapper}>
            <div className={style.infoText}>{name}</div>
            <div className={style.infoText}>{gender}</div>
            <div className={style.infoText}>{msToBirthdate(+new Date(birthdate))}</div>
            <div className={style.infoText}>{city}</div>
         </div>
         <div className={style.buttons}>
            <div onClick={onEditPress} className={`${style.button} ${style.buttonEdit}`} >{`Edit`}</div>
            <div onClick={onDeletePress} className={`${style.button} ${style.buttonDelete}`}>{`Delete`}</div>
         </div>
      </div>
   )
}

export default ProfileCard