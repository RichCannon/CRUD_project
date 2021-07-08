import { useState, useContext, useEffect } from 'react';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import Preloader from '../../components/Preloader/Preloader';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/useHttp';

import style from './DashboardPage.module.css';

type DashboardResponseT = {
   usersCount: number
   profileCount: number
   profileOver18: number
}

const DashboardPage = () => {

   const { request, isLoading } = useHttp()
   const auth = useContext(AuthContext)
   const [dashboardData, setDashboardData] = useState<DashboardResponseT>({ usersCount: 0, profileCount: 0, profileOver18:0 })

   useEffect(() => {
      (async () => {
         const response = await request<DashboardResponseT>({
            url: `/api/dashboard`,
            headers: { authorization: `Bearer ${auth.token}` }
         })
         setDashboardData(response)
      })()
   }, [])



   return (
      <div className={style.container}>
         {isLoading
            ? <Preloader />
            : <>
               <DashboardCard title={`Users:`} amount={dashboardData.usersCount} />
               <DashboardCard title={`Profiles:`} amount={dashboardData.profileCount} />
               <DashboardCard title={`Profiles over 18 years old:`} amount={dashboardData.profileOver18} />
            </>
         }
      </div>
   )
}

export default DashboardPage;
