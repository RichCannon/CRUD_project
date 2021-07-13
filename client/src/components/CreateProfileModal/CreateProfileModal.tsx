import { FC } from 'react'

import style from './CreateProfileModal.module.css'


type CreateProfileModalProps = {
   onDismissClick: () => void

}

const CreateProfileModal: FC<CreateProfileModalProps> = ({ children, onDismissClick }) => {


   return (
      <div data-testid={`modalContainer`} onClick={onDismissClick} className={style.container}>
         <div  data-testid={`modalContent`} onClick={e => e.stopPropagation()} className={style.contentWrapper}>
            {children}
         </div>
      </div>
   )
}

export default CreateProfileModal