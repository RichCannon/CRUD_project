import { useState, useContext, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import ContentModalProfile from '../../components/ContentModalProfile/ContentModalProfile';
import ContentModalUser from '../../components/ContentModalUser/ContentModalUser';
import CreateProfileButton from '../../components/CreateProfileButton/CreateProfileButton';
import CreateProfileModal from '../../components/CreateProfileModal/CreateProfileModal';
import Preloader from '../../components/Preloader/Preloader';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';
import {
   CreateProfileBody,
   CREATE_PROFILE_URL, DELETE_PROFILE_URL,
   DELETE_USER_URL, GenderT, GET_PROFILES_URL, GET_USER_URL,
   PATCH_PROFILE_URL, PATCH_USER_URL, RoleT
} from '../../types/types';
import { BucketIcon } from './assets/BucketIcon';
import { EditIcon } from './assets/EditIcon';
import style from './ProfilesPage.module.css';

type CreateProfileFormT = {
   name: string,
   gender: GenderT
   birthdate: string
   city: string
   _id?: string
   owner?: string
}




type UserDataT = { userName: string, role: RoleT, email: string, userId?: string }

const ProfilesPage = () => {

   const auth = useContext(AuthContext)

   const { id: userId } = useParams<{ id?: string }>()


   const history = useHistory()

   const [name, setName] = useState(``)
   const [gender, setGender] = useState<GenderT>(`male`)
   const [birthdate, setBirthdate] = useState(``)
   const [city, setCity] = useState(``)

   const [userName, setUserName] = useState(``)
   const [email, setEmail] = useState(``)
   const [role, setRole] = useState<RoleT>(`user`)

   const [userData, setUserData] = useState({ userName: ``, email: ``, role: `user` })


   const [isVisible, setIsVisible] = useState(false)
   const [isVisibleUserModal, setIsVisibleUserModal] = useState(false)


   const clearState = () => {
      setName(``)
      setGender(`male`)
      setBirthdate(``)
      setCity(``)
      clearError()
      setCurrentEdit({ owner: ``, _id: `` })
   }

   const validate = useRef(new SimpleReactValidator())




   const [currentEdit, setCurrentEdit] = useState<{ owner?: string, _id: string }>({ owner: ``, _id: `` })

   const [profilesData, setProfilesData] = useState<CreateProfileBody[]>([])

   const { request, isLoading, error, clearError, setError } = useHttp()

   const { request: getProfileDataRequest,
      isLoading: profileDataLoading,
      error: profileDataErorr,
      clearError: profileDataClError } = useHttp()

   // useEffect(() => {
   //    if (profileDataErorr) {
   //       alert(profileDataErorr)
   //    }
   // }, [profileDataErorr])


   const getProfileData = async (userId?: string) => {
      const URL = userId ? `${GET_PROFILES_URL}/${userId}` : GET_PROFILES_URL

      const data = await getProfileDataRequest<CreateProfileBody[]>({
         url: URL,
         headers: { authorization: `Bearer ${auth.token}` }
      })

      setProfilesData(data)
      profileDataClError()
   }



   const getUserData = async () => {
      const user = await request<UserDataT>({
         url: `${GET_USER_URL}/${userId}`, headers: {
            authorization: `Bearer ${auth.token}`
         }
      })

      setUserData({
         userName: user.userName,
         email: user.email,
         role: user.role
      })

      setEmail(user.email)
      setUserName(user.userName)
      setRole(user.role)

   }

   useEffect(() => {
      if (userId) {
         getUserData()
      }

      getProfileData(userId)
   }, [userId])



   const onEditPress = (data: CreateProfileBody) => {
      setIsVisible(true)
      setName(data.name)
      setGender(data.gender)
      setBirthdate(data.birthdate)
      setCity(data.city)
      if (data._id) {
         setCurrentEdit({ owner: data.owner, _id: data._id })
      }

   }


   const onDeletePress = async (profileId?: string, userId?: string) => {

      const areYouSure = window.confirm(`Are you sure?`)

      if (areYouSure) {
         await getProfileDataRequest({
            url: DELETE_PROFILE_URL,
            method: `DELETE`,
            body: { _id: profileId, userId },
            headers: { authorization: `Bearer ${auth.token}` }
         })

         const profileData = await getProfileDataRequest<CreateProfileBody[]>({
            url: `${GET_PROFILES_URL}/${userId}`,
            headers: { authorization: `Bearer ${auth.token}` }
         })

         setProfilesData(profileData)
      }


   }

   const onAddProfileClick = () => {
      setIsVisible(true)
   }

   const onAcceptClick = async () => {
      const body: CreateProfileFormT = {
         city,
         birthdate,
         gender,
         name
      }


      validate.current.message(`city`, city, `required|min:2`)
      validate.current.message(`name`, name, `required|min:4`)
      validate.current.message(`birthdate`, birthdate, `required`)

      const validating = validate.current.getErrorMessages()


      if (validate.current.allValid()) {
         if (currentEdit._id && currentEdit.owner) {
            await request({
               url: PATCH_PROFILE_URL,
               body: { ...body, ...currentEdit },
               method: `PATCH`,
               headers: { authorization: `Bearer ${auth.token}` }
            })

         }
         else {
            await request({
               url: CREATE_PROFILE_URL,
               body,
               method: `POST`,
               headers: { authorization: `Bearer ${auth.token}` }
            })
         }
         setCurrentEdit({ owner: ``, _id: `` })

         getProfileData(userId)

         clearState()
         setIsVisible(false)
      }

      else {
         setError(validating)
      }




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


   // User modal state
   const onEmailChange = (value: string) => {
      clearError(`email`)
      setEmail(value)
   }

   const onUserNameChange = (value: string) => {
      clearError(`userName`)
      setUserName(value)
   }

   const onRoleChange = (role: RoleT) => {
      setRole(role)
   }

   const onAcceptUserClick = async () => {
      const body: UserDataT = {
         email, userName, role, userId
      }

      validate.current.message(`email`, email, `required|email`)
      validate.current.message(`userName`, userName, `required|min:5`)

      if (validate.current.allValid()) {
         await request({
            url: PATCH_USER_URL, body, method: `PATCH`, headers: {
               authorization: `Bearer ${auth.token}`
            }
         })

         getUserData()
         clearError()
         setIsVisibleUserModal(false)
      }
      else {
         setError(validate.current.getErrorMessages())
      }


   }

   const onDeclineUserClick = () => {
      setIsVisibleUserModal(false)
      clearError()
   }

   const onEditIconClick = () => {
      setIsVisibleUserModal(true)
   }

   const onDeleteIconClick = async () => {
      const areYouSure = window.confirm(`Are you sure?`)
      if (areYouSure) {
         await request({
            url: DELETE_USER_URL, body: { userId },
            method: `DELETE`,
            headers: {
               authorization: `Bearer ${auth.token}`
            }
         })
         history.push(`/users`)
      }

   }




   return (
      <div className={style.container}>
         {profileDataLoading
            ? <Preloader />
            : <>
               {isVisible &&
                  <CreateProfileModal onDismissClick={onDeclineClick}>
                     <ContentModalProfile
                        onAcceptClick={onAcceptClick}
                        onDeclineClick={onDeclineClick}
                        onNameChange={onNameChange}
                        onGenderChange={onGenderChange}
                        onBirthDateChange={onBirthDateChange}
                        onCityChange={onCityChange}
                        name={name}
                        gender={gender}
                        birthdate={birthdate ? new Date(birthdate).toISOString().slice(0, 10) : ``}
                        city={city}
                        isLoading={isLoading}
                        errorBirthdate={error && error[`birthdate`]}
                        errorName={error && error[`name`]}
                        errorCity={error && error[`city`]} />
                  </CreateProfileModal>
               }
               {isVisibleUserModal &&
                  <CreateProfileModal onDismissClick={onDeclineClick}>
                     <ContentModalUser
                        onAcceptClick={onAcceptUserClick}
                        onDeclineClick={onDeclineUserClick}
                        onEmailChange={onEmailChange}
                        onRoleChange={onRoleChange}
                        onUserNameChange={onUserNameChange}
                        userName={userName}
                        role={role}
                        email={email}
                        isLoading={isLoading}
                        errorUserName={error && error[`userName`]}
                        errorEmail={error && error[`email`]}

                     />
                  </CreateProfileModal>}
               {!!userId &&
                  <div className={style.userDataWrapper}>
                     <div className={style.userDataText}>{userData.userName}</div>
                     <div className={style.userDataText}>{userData.email}</div>
                     <div className={style.userDataTextRole}>{userData.role}</div>
                     <div className={style.userEditDelIcon}>
                        <EditIcon onClick={onEditIconClick} />
                        <BucketIcon onClick={onDeleteIconClick} />
                     </div>
                  </div>
               }
               <div className={style.title}>Profiles:</div>
               <div className={style.list}>
                  {profilesData.map((d, idx) => (
                     <div key={`PROFILE_CARD_${idx}`} className={style.profileCard}>
                        <ProfileCard
                           data={d}
                           onEditPress={() => onEditPress(d)}
                           onDeletePress={() => onDeletePress(d._id, d.owner)} />
                     </div >
                  ))}
                  {!userId && <CreateProfileButton onClick={onAddProfileClick} />}
               </div>
            </>}
      </div>

   )
}

export default ProfilesPage;
