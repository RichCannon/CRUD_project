import { FC } from "react"

import style from './MyCheckbox.module.css';


type MyCheckboxProps = {
   isClicked: boolean
   onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
   label?: string
   isRound?: boolean
}

const MyCheckbox: FC<MyCheckboxProps> = ({ isClicked, onClick, label, isRound }) => {
   return (
      <div onClick={onClick} className={style.mainContainer}>
         <div className={`${style.container} ${isRound ? style.circleCheckbox : ``}`}>
            {isClicked && <div className={`${style.dot} ${isRound ? style.circleCheckbox : ``}`} />}
         </div>
         {!!label && <div className={style.labelText}>{label}</div>}
      </div>
   )
}

export default MyCheckbox