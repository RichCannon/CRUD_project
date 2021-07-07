import { FC } from 'react'

import style from './DashboardCard.module.css'

type DashboardCardT = {
   title: string
   amount: number
}

const DashboardCard: FC<DashboardCardT> = ({ title, amount }) => {

   return (
      <div className={style.container}>
         <div className={style.title}>{title}</div>
         <div className={style.amount}>{amount}</div>
      </div>
   )
}

export default DashboardCard