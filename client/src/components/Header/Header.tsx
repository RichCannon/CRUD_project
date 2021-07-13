import { FC, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import { DashboardIcon } from './assets/DashboardIcon'
import { ProfilesIcon } from './assets/ProfilesIcon'
import { UsersIcon } from './assets/UsersIcon'
import style from './Header.module.css'

type HeaderProps = {
   onLogout: () => void
}

const Header: FC<HeaderProps> = ({ onLogout }) => {


   const { userData } = useContext(AuthContext)

   const onLogoutClick = () => {
      onLogout()

   }

   return (
      <div className={style.container}>
         <div className={style.leftTab}>
            <div className={`${style.avatar} ${userData.role === `admin` ? style.adminAvatar : ``}`}></div>
            <div className={style.userNameText}>{userData.userName}</div>
         </div>
         <div className={style.rightTab}>
            <div className={style.headerTabs}>
               <NavLink data-testid={`toProfiles`} to={`/profiles`} className={style.headerTab}>
                  <div className={style.headerTabLabel}>{`Profiles`}</div>
                  <ProfilesIcon />
               </NavLink>
               {
                  userData.role === `admin` &&
                  <>
                     <NavLink data-testid={`toDashboard`} to={`/dashboard`} className={style.headerTab}>
                        <div className={style.headerTabLabel}>{`Dashboard`}</div>
                        <DashboardIcon />
                     </NavLink>
                     <NavLink data-testid={`toUsers`} to={`/users`} className={style.headerTab}>
                        <div className={style.headerTabLabel}>{`Users`}</div>
                        <UsersIcon />
                     </NavLink>
                  </>
               }
            </div>
            <div className={style.logOutButton}>
               <div onClick={onLogoutClick} className={style.headerTab}>
                  <div className={style.headerTabLabel}>{`Log out`}</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header