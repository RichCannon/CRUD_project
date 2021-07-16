import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';

import UserCard from '../../components/UserCard/UserCard';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';
import { GET_USER_URL, UserT } from '../../types/types';
import style from './UsersPage.module.css';

const UsersPage = () => {

   const { request, error, isLoading, clearError } = useHttp()

   const auth = useContext(AuthContext)

   const history = useHistory()

   const [usersData, setUsersData] = useState<UserT[]>([])

   useEffect(() => {
      if (error) {
         clearError()
      }
   }, [error])


   useEffect(() => {

      if (auth.userData.role !== `admin`) {
         history.push(`/profiles`)
      }
      
      else {
         (async () => {
            const users = await request<UserT[]>({
               url: GET_USER_URL, headers: {
                  authorization: `Bearer ${auth.token}`
               }
            })

            setUsersData(users)
         })()

      }
   }, [auth.token, request])



   return (
      <div className={style.container}>
         {isLoading
            ? <Preloader />
            : <>
               <div className={style.title}>Users:</div>
               <div className={style.content}>
                  {usersData.map((d, idx) => (
                     <div key={`USER_CARD_${idx}`} className={style.cardWrapper}>
                        <UserCard
                           role={d.role}
                           userId={auth.userId !== d._id ? d._id : ``}
                           userName={d.userName}
                           numOfProfiles={d.numOfProfiles}
                           email={d.email} />
                     </div>
                  ))}
               </div>
            </>
         }
      </div>
   )
}

export default UsersPage;
