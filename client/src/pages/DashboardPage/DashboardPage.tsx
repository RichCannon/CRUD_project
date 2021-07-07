import { useState, useContext, useEffect } from 'react';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';

import style from './DashboardPage.module.css';

const DashboardPage = () => {

   const { request } = useHttp()
   const auth = useContext(AuthContext)

   useEffect(() => {
      (async () => {
         const usersCount = request<any>({
            url: `/api/dashboard`,
            headers: { authorization: `Bearer ${auth.token}` }
         })
      })()
   }, [])

   return (
      <div className={style.container}>
         <DashboardCard title={`Users:`} amount={12} />
         <DashboardCard title={`Profiles:`} amount={12} />
         <DashboardCard title={`Profiles over 18 years old:`} amount={12} />
      </div>
   )
}

export default DashboardPage;
