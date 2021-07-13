import { FC, KeyboardEvent } from 'react';

import style from './MyInput.module.css';

type MyInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
   label: string
   value: string
   onTextChange: (value: string) => void
   errorText?: string | null
   onEnterPress?: () => void

}


const MyInput: FC<MyInputProps> = ({ label, value, onTextChange, onEnterPress, errorText, ...restProps }) => {

   const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.key === `Enter` && onEnterPress) {
         onEnterPress()
      }
   }

   return (
      <div className={style.container}>
         <div className={style.label}>{label}</div>
         <input data-testid={`myInput`} className={`${style.input} ${!!errorText ? style.inputError : ``}`}
            value={value} onChange={(e) => onTextChange(e.target.value)}
            onKeyPress={onKeyPress}
            {...restProps} />
         <div data-testid={`errorField`} className={style.error}>{errorText || ``}</div>
      </div>
   )
}

export default MyInput;
