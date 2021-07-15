import { FC } from "react";

export const EditIcon: FC<{ onClick?: () => void }> = ({ onClick }) => (
   <svg style={{ cursor: `pointer` }} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M2.55132 15.6617L16.5525 1.66054C16.5891 1.64879 16.632 1.63592 16.6805 1.62278C16.8837 1.56774 17.1757 1.51068 17.5188 1.50595C18.1849 1.49676 19.0653 1.68066 19.9201 2.53553C20.775 3.3904 20.9589 4.27079 20.9497 4.93692C20.945 5.27995 20.8879 5.57197 20.8329 5.77516C20.8198 5.82368 20.8069 5.86655 20.7951 5.90318L6.79396 19.9044L1.97278 20.4829L2.55132 15.6617Z"
         stroke="#14142B" strokeWidth="2" strokeLinecap="round" />
   </svg>
)