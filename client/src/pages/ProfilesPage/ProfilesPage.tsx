import { useState, useContext, useEffect } from 'react'

import CreateProfileButton from '../../components/CreateProfileButton/CreateProfileButton';
import CreateProfileModal from '../../components/CreateProfileModal/CreateProfileModal';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';
import { CreateProfileBody, CREATE_PROFILE_URL, DELETE_PROFILE_URL, GenderT, GET_PROFILES_URL, PATCH_PROFILE_URL } from '../../types/types';
import style from './ProfilesPage.module.css';

const ProfilesPage = () => {

   const auth = useContext(AuthContext)

   const [name, setName] = useState(``)
   const [gender, setGender] = useState<GenderT>(`male`)
   const [birthdate, setBirthdate] = useState(``)
   const [city, setCity] = useState(``)

   const clearState = () => {
      setName(``)
      setGender(`male`)
      setBirthdate(``)
      setCity(``)
      clearError()
   }

   const [currentEdit, setCurrentEdit] = useState<{ owner?: string, _id: string }>({ owner: ``, _id: `` })

   const [profilesData, setProfilesData] = useState<CreateProfileBody[]>([])

   const { request, isLoading, error, clearError } = useHttp()
   const { request: getProfileDataRequest,
      isLoading: profileDataLoading,
      error: profileDataErorr,
      clearError: profileDataClError } = useHttp()

   const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {

      (async () => {
         const data = await getProfileDataRequest<CreateProfileBody[]>({
            url: GET_PROFILES_URL,
            headers: { authorization: `Bearer ${auth.token}` }
         })
         if (!profileDataErorr) {
            setProfilesData(data)
         }
         else {
            alert(profileDataErorr)
         }

      })()
   }, [])



   const onEditPress = async (data: CreateProfileBody) => {
      setIsVisible(true)
      setName(data.name)
      setGender(data.gender)
      setBirthdate(data.birthdate)
      setCity(data.city)
      if (data._id) {
         setCurrentEdit({ owner: data.owner, _id: data._id })
      }
   }


   const onDeletePress = async (_id?: string) => {
      const data = await getProfileDataRequest<CreateProfileBody[]>({
         url: DELETE_PROFILE_URL,
         method: `DELETE`,
         body: { _id },
         headers: { authorization: `Bearer ${auth.token}` }
      })
      if (!profileDataErorr) {
         const data = await getProfileDataRequest<CreateProfileBody[]>({
            url: GET_PROFILES_URL,
            headers: { authorization: `Bearer ${auth.token}` }
         })
         if (!profileDataErorr) {
            setProfilesData(data)
         }
         else {
            alert(profileDataErorr)
         }
      }
      else {
         alert(profileDataErorr)
      }
   }

   const onAddProfileClick = () => {
      setIsVisible(true)
   }

   const onAcceptClick = async () => {
      const body: CreateProfileBody = {
         city,
         birthdate,
         gender,
         name
      }

      if (currentEdit._id && currentEdit.owner) {

         const data = await request({
            url: PATCH_PROFILE_URL,
            body: { ...body, ...currentEdit },
            method: `PATCH`,
            headers: { authorization: `Bearer ${auth.token}` }
         })

      }
      else {
         const data = await request({
            url: CREATE_PROFILE_URL,
            body,
            method: `POST`,
            headers: { authorization: `Bearer ${auth.token}` }
         })
      }

      setCurrentEdit({ owner: ``, _id: `` })


      const data = await getProfileDataRequest<CreateProfileBody[]>({
         url: GET_PROFILES_URL,
         headers: { authorization: `Bearer ${auth.token}` }
      })
      if (!profileDataErorr) {
         setProfilesData(data)
      }
      else {
         alert(profileDataErorr)
      }

      clearState()
      setIsVisible(false)
   }

   const onDeclineClick = () => {
      setIsVisible(false)
      clearState()
   }

   const onNameChange = (value: string) => {
      clearError(`name`)
      setName(value)
   }

   const onGenderChange = (value: GenderT) => {
      setGender(value)
   }

   const onBirthDateChange = (value: string) => {
      clearError(`birthdate`)
      setBirthdate(value)
   }

   const onCityChange = (value: string) => {
      clearError(`city`)
      setCity(value)
   }




   return (
      <div className={style.container}>
         {isVisible && <CreateProfileModal
            onAcceptClick={onAcceptClick}
            onDeclineClick={onDeclineClick}
            onNameChange={onNameChange}
            onGenderChange={onGenderChange}
            onBirthDateChange={onBirthDateChange}
            onCityChange={onCityChange}
            name={name}
            gender={gender}
            birthdate={birthdate}
            city={city}
            isLoading={isLoading}
            errorBirthdate={error && error[`birthdate`]}
            errorName={error && error[`name`]}
            errorCity={error && error[`city`]} />}
         <div className={style.title}>Profiles:</div>
         <div className={style.list}>
            {profilesData.map((d, idx) => (
               <div key={`PROFILE_CARD_${idx}`} className={style.profileCard}>
                  <ProfileCard
                     data={d}
                     onEditPress={() => onEditPress(d)}
                     onDeletePress={() => onDeletePress(d._id)} />
               </div >
            ))}
            <CreateProfileButton onClick={onAddProfileClick} />
         </div>
      </div>

   )
}

export default ProfilesPage;
