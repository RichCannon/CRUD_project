import { FC,KeyboardEvent } from 'react';

import style from './MyInput.module.css';

type MyInput =  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
   label: string
   value: string
   onTextChange: (value: string) => void
   errorText?: string | null
   onEnterPress?: () => void

} 


const MyInput: FC<MyInput> = ({ label, value, onTextChange,onEnterPress, errorText, ...restProps }) => {

   const onKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.nativeEvent.key === `Enter` && onEnterPress) {
        onEnterPress() 
      }
   }

   return (
      <div className={style.container}>
         <div className={style.label}>{label}</div>
         <input className={`${style.input} ${!!errorText ? style.inputError : ``}`} 
         value={value} onChange={(e) => onTextChange(e.target.value)}
         onKeyPress={onKeyPress}
          {...restProps}   />
         <div className={style.error}>{errorText || ``}</div>
      </div>
   )
}

export default MyInput;
