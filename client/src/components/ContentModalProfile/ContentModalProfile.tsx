
import style from './ContentModalProfile.module.css'
import MyCheckbox from "../MyCheckbox/MyCheckbox"
import MyInput from "../MyInput/MyInput"
import { GenderT } from '../../types/types'
import { FC } from 'react'
import ModalButton from '../ModalButton/ModalButton'


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
   errorName?: string | null
   errorCity?: string | null
   errorBirthdate?: string | null
   isLoading: boolean
}


const ContentModalProfile: FC<CreateProfileModalProps> = ({
   onNameChange,
   onGenderChange,
   onBirthDateChange,
   onCityChange,
   onAcceptClick,
   onDeclineClick,
   name,
   gender,
   birthdate,
   city,
   isLoading,
   errorName = null,
   errorCity = null,
   errorBirthdate = null
}) => {
   return (<>
      <MyInput errorText={errorName} value={name} onTextChange={onNameChange} label={`name:`} />
      <div className={style.genderWrapper}>
         <div className={style.checkboxLabel}>{`gender:`}</div>
         <div className={style.checkboxWrapper}>
            <MyCheckbox isRound label={`male`} isClicked={gender === `male`} onClick={() => onGenderChange(`male`)} />
            <MyCheckbox isRound label={`female`} isClicked={gender === `female`} onClick={() => onGenderChange(`female`)} />
         </div>
      </div>
      <MyInput
         max={new Date().toISOString().slice(0, 10)}
         type={`date`}
         errorText={errorBirthdate}
         value={birthdate}
         onTextChange={onBirthDateChange}
         label={`birthdate:`} />
      <MyInput onEnterPress={onAcceptClick} errorText={errorCity} value={city} onTextChange={onCityChange} label={`city:`} />

      <ModalButton onAcceptClick={onAcceptClick} onDeclineClick={onDeclineClick} isLoading={isLoading} />
   </>)
}

export default ContentModalProfile