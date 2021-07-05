import { FC } from "react"

import style from './MyCheckbox.module.css';


type MyCheckbox = {
   isClicked: boolean
   onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
   label?: string
}

const MyCheckbox: FC<MyCheckbox> = ({ isClicked, onClick,label }) => {
   return (
      <div onClick={onClick}  className={style.mainContainer}>
         <div className={style.container}>
            {isClicked && <div className={style.dot} />}
         </div>
         {!!label && <div className={style.labelText}>{label}</div> }
      </div>
   )
}

export default MyCheckbox