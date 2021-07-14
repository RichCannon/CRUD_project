
// export const msToBirthdate = (ms: number) => (
//    new Date(ms).toLocaleDateString().split(`/`).map(d => d.length < 2 ? `0${d}` : d).join(`.`)

// )

export const birthdateValidate = (value: string) => (
   ((/(^(((0[1-9]|1[0-9]|2[0-8])[.](0[1-9]|1[012]))|((29|30|31)[.](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[.](19|[2-9][0-9])\d\d$)|(^29[.]02[.](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/).test(value))
)

export const birthdateGtThDateNow = (value: number) => (value >= Date.now())