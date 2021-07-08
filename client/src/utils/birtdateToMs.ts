export const birthdateToMs = (date: string) => {
   const frmtdBirthdateArr = date.split(`.`)
   return +new Date(+frmtdBirthdateArr[2], +frmtdBirthdateArr[1] - 1, +frmtdBirthdateArr[0])
}

export const msToBirthdate = (ms: number) => {
   const date = new Date(ms).toLocaleDateString().split(`/`).map(d => d.length < 2 ? `0${d}` : d)
   const temp = date[0]
   date[0] = date[1]
   date[1] = temp
   return date.join(`.`)

}
