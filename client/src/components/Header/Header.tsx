import { FC } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import { DashboardIcon } from './assets/DashboardIcon'
import { ProfilesIcon } from './assets/ProfilesIcon'
import { UsersIcon } from './assets/UsersIcon'
import style from './Header.module.css'

type Header = {
   onLogout: () => void
}

const Header: FC<Header> = ({ onLogout }) => {

   const history = useHistory()

   const onLogoutClick = () => {
      onLogout()
     // history.push(`/`)

   }

   return (
      <div className={style.container}>
         <div className={style.leftTab}>
            <div className={style.avatar}></div>
            <div className={style.userNameText}>{`RichCannon`}</div>
         </div>
         <div className={style.rightTab}>
            <div className={style.headerTabs}>
               <NavLink to={`/profiles`} className={style.headerTab}>
                  <div className={style.headerTabLabel}>{`Profiles`}</div>
                  <ProfilesIcon />
               </NavLink>
               <NavLink to={`/dashboard`} className={style.headerTab}>
                  <div className={style.headerTabLabel}>{`Dashboard`}</div>
                  <DashboardIcon />
               </NavLink>
               <NavLink to={`/users`} className={style.headerTab}>
                  <div className={style.headerTabLabel}>{`Users`}</div>
                  <UsersIcon />
               </NavLink>
            </div>
            <div className={style.logOutButton}>
               <div  onClick={onLogoutClick} className={style.headerTab}>
                  <div className={style.headerTabLabel}>{`Log out`}</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header