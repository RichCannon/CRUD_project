import { FC } from "react";

export const BucketIcon: FC<{ onClick?: () => void }> = ({ onClick }) => (
   <svg style={{ cursor: `pointer` }} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3.80874 20.1498L3.05125 5H20.9487L20.1913 20.1498C20.1114 21.7464 18.7936 23 17.195 23H6.805C5.20637 23 3.88857 21.7464 3.80874 20.1498Z" stroke="#14142B" strokeWidth="2" />
      <path d="M8 5H16V3C16 1.89543 15.1046 1 14 1H10C8.89543 1 8 1.89543 8 3V5Z" stroke="#14142B" strokeWidth="2" />
      <path d="M1 5H23" stroke="#14142B" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 11V16" stroke="#14142B" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 11V16" stroke="#14142B" strokeWidth="2" strokeLinecap="round" />
   </svg>
)