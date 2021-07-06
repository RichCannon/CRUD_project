import { useContext, useState } from 'react'
import CreateProfileButton from '../../components/CreateProfileButton/CreateProfileButton';
import CreateProfileModal from '../../components/CreateProfileModal/CreateProfileModal';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

import { AuthContext } from '../../context/AuthContext';
import style from './ProfilesPage.module.css';

const ProfilesPage = () => {

   const [name, setName] = useState(``)
   const [gender, setGender] = useState<`male` | `female`>(`male`)
   const [birthdate, setBirthdate] = useState(``)
   const [city, setCity] = useState(``)

   const [isVisible, setIsVisible] = useState(false)




   const onEditPress = () => {
      console.log(`Edit`)
   }


   const onDeletePress = () => {
      console.log(`Delete`)
   }

   const onAddProfileClick = () => {
      setIsVisible(true)
      console.log(`On add profile`)
   }

   const onAcceptClick = () => {
      setIsVisible(false)
   }

   const onDeclineClick = () => {
      setIsVisible(false)
   }

   const data: {
      name: string,
      gender: `male` | 'female'
      birthdate: string
      city: string
   }[] = [
         {
            name: `Name`,
            gender: `male`,
            birthdate: `21:33:44`,
            city: `Kiev`
         },
         {
            name: `Name2`,
            gender: `male`,
            birthdate: `21:33:44`,
            city: `Kiev`
         },
         {
            name: `Name3`,
            gender: `male`,
            birthdate: `21:33:44`,
            city: `Kiev`
         },
         {
            name: `Name4`,
            gender: `male`,
            birthdate: `21:33:44`,
            city: `Kiev`
         },
      ]

   return (
      <div className={style.container}>
         {isVisible && <CreateProfileModal
            onAcceptClick={onAcceptClick}
            onDeclineClick={onDeclineClick}
            onNameChange={(value) => setName(value)}
            onGenderChange={(value) => setGender(value)}
            onBirthDateChange={(value) => setBirthdate(value)}
            onCityChange={(value) => setCity(value)}
            name={name}
            gender={gender}
            birthdate={birthdate}
            city={city} />}
         <div className={style.title}>Profiles:</div>
         <div className={style.list}>
            {data.map(d => (
               <div className={style.profileCard}>
                  <ProfileCard data={d}
                     onEditPress={onEditPress}
                     onDeletePress={onDeletePress} />
               </div >
            ))}
            <CreateProfileButton onClick={onAddProfileClick} />
         </div>
      </div>

   )
}

export default ProfilesPage;
