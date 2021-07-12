import { FC } from 'react';
import Preloader from '../Preloader/Preloader';

import style from './MyButton.module.css';

type MyButtonProps = {
   label: string
   onButtonClick: (...args: any) => void
   isDisabled?: boolean
   isLoading?: boolean
}


const MyButton: FC<MyButtonProps> = ({ label, onButtonClick, isDisabled, isLoading = true }) => {

   return (
      <div onClick={isDisabled ? () => 1 : onButtonClick} className={style.container} >
         {isLoading ? <Preloader style={{ transform: `scale(.5)` }} /> : <div className={style.label}>{label}</div>}
      </div>
   )
}



export default MyButton;
