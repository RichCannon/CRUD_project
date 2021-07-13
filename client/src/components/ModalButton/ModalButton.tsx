import { FC } from 'react'

import CrossIcon from '../CreateProfileModal/assets/CrossIcon'
import DoneIcon from '../CreateProfileModal/assets/DoneIcon'
import style from './ModalButton.module.css'

type ModalButtonProps = {
   isLoading: boolean
   onAcceptClick: () => void
   onDeclineClick: () => void
}

const ModalButton:FC<ModalButtonProps> = ({ isLoading, onAcceptClick, onDeclineClick }) => {
   return (
      <div className={style.modalButtonsWrapper}>
         <div data-testid={`acceptButton`} onClick={isLoading ? () => { } : onAcceptClick} className={style.modalButton}>
            <DoneIcon />
         </div>
         <div data-testid={`declineButton`} onClick={isLoading ? () => { } : onDeclineClick} className={style.modalButton}>
            <CrossIcon />
         </div>
      </div>
   )
}

export default ModalButton