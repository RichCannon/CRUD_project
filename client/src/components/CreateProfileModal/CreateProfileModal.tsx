import { FC } from 'react'
import MyCheckbox from '../MyCheckbox/MyCheckbox'
import MyInput from '../MyInput/MyInput'
import CrossIcon from './assets/CrossIcon'
import DoneIcon from './assets/DoneIcon'
import style from './CreateProfileModal.module.css'

type GenderT = `male` | `female`

type CreateProfileModalProps = {
   onNameChange: (value: string) => void
   onGenderChange: (value: GenderT) => void
   onBirthDateChange: (value: string) => void
   onCityChange: (value: string) => void
   onAcceptClick: () => void
   onDeclineClick: () => void
   name: string
   gender: GenderT
   birthdate: string
   city: string
}

const CreateProfileModal: FC<CreateProfileModalProps> = ({
   onNameChange,
   onGenderChange,
   onBirthDateChange,
   onCityChange,
   onAcceptClick,
   onDeclineClick,
   name,
   gender,
   birthdate,
   city
}) => {


   return (
      <div className={style.container}>
         <div className={style.contentWrapper}>
            <MyInput value={name} onTextChange={onNameChange} label={`name:`} />
            <div className={style.genderWrapper}>
               <div className={style.checkboxLabel}>{`gender:`}</div>
               <div className={style.checkboxWrapper}>
                  <MyCheckbox isRound label={`male`} isClicked={gender === `male`} onClick={() => onGenderChange(`male`)} />
                  <MyCheckbox isRound label={`female`} isClicked={gender === `female`} onClick={() => onGenderChange(`female`)} />
               </div>
            </div>
            <MyInput value={birthdate} onTextChange={onBirthDateChange} label={`birthdate:`} />
            <MyInput value={city} onTextChange={onCityChange} label={`city:`} />
            <div className={style.modalButtonsWrapper}>
               <div onClick={onAcceptClick} className={style.modalButton}>
                  <DoneIcon />
               </div>
               <div onClick={onDeclineClick} className={style.modalButton}>
                  <CrossIcon />
               </div>
            </div>
         </div>
      </div>
   )
}

export default CreateProfileModal