import { FC } from 'react';

import style from './MyInput.module.css';

type MyInput =  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
   label: string
   value: string
   onTextChange: (value: string) => void

} 


const MyInput: FC<MyInput> = ({ label, value, onTextChange, ...restProps }) => {

   return (
      <div className={style.container}>
         <div className={style.label}>{label}</div>
         <input className={style.input} value={value} onChange={(e) => onTextChange(e.target.value)} {...restProps}   />
      </div>
   )
}

export default MyInput;
