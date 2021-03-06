export const birthdateToMs = (date: string) => {
   const frmtdBirthdateArr = date.split(`.`)
   return +new Date(+frmtdBirthdateArr[2], +frmtdBirthdateArr[1] - 1, +frmtdBirthdateArr[0])
}

export const msToBirthdate = (ms: number) => new Date(ms).toLocaleDateString().replaceAll(`/`, `.`)

