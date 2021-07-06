
import { FC } from 'react'

import style from './CreateProfileButton.module.css'

type CreateProfileButtonProps = {
   onClick: () => void
}

const CreateProfileButton: FC<CreateProfileButtonProps> = ({ onClick }) => {


   return (
      <div onClick={onClick} className={style.container}>
         <div className={style.circle}>
            <div className={style.plus} />
            <div className={style.minus} />
         </div>
         <div className={style.title}>{`Create new profile`}</div>
      </div>
   )
}

export default CreateProfileButton