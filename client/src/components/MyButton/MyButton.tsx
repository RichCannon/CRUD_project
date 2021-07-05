import { FC } from 'react';

import style from './MyButton.module.css';

type MyButton = {
   label: string
   onButtonClick: (...args: any) => void
   isDisabled?: boolean
}


const MyButton: FC<MyButton> = ({ label, onButtonClick, isDisabled }) => {

   return (
      <div onClick={isDisabled ? () => 1 : onButtonClick} className={style.container} >
         <div className={style.label}>{label}</div>
      </div>
   )
}



export default MyButton;
