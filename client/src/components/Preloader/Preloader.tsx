import { FC } from 'react'
import cssStyle from './Preloader.module.css'


type PreloaderProps = {
   style?: React.CSSProperties
}

const Preloader: FC<PreloaderProps> = ({ style }) => {
   return (
      <div style={style} className={cssStyle.container}>
         <div className={cssStyle.ldsRing}><div></div><div></div><div></div><div></div></div>
      </div>
   )
}

export default Preloader