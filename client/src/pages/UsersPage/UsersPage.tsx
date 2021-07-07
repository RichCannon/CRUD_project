import { useState, useContext, useEffect } from 'react';

import UserCard from '../../components/UserCard/UserCard';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';
import { GET_USER_URL, UserT } from '../../types/types';
import style from './UsersPage.module.css';

const UsersPage = () => {

   const { request, error } = useHttp()

   const auth = useContext(AuthContext)

   const [usersData, setUsersData] = useState<UserT[]>([])

   useEffect(() => {
      (async () => {
         const users = await request<UserT[]>({
            url: GET_USER_URL, headers: {
               authorization: `Bearer ${auth.token}`
            }
         })

         setUsersData(users)
      })()
   }, [])

   const onCardClick = (id: string) => {
      console.log(id)
   }

   return (
      <div className={style.container}>
         <div className={style.title}>Users:</div>
         <div className={style.content}>
            {usersData.map((d, idx) => (
               <div  key={`USER_CARD_${idx}`} className={style.cardWrapper}>
                  <UserCard
                     userName={d.userName}
                     numOfProfiles={d.numOfProfiles}
                     email={d.email}
                     onCardClick={() => onCardClick(d._id)} />
               </div>
            ))}
         </div>
      </div>
   )
}

export default UsersPage;
