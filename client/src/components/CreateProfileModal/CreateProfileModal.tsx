import { FC } from 'react'

import style from './CreateProfileModal.module.css'


type CreateProfileModalProps = {
   onDismissClick: () => void

}

const CreateProfileModal: FC<CreateProfileModalProps> = ({ children, onDismissClick }) => {


   return (
      <div onClick={onDismissClick} className={style.container}>
         <div  onClick={e => e.stopPropagation()} className={style.contentWrapper}>
            {children}
         </div>
      </div>
   )
}

export default CreateProfileModal