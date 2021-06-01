export const GetLocalStorage = (key) => {
  const ISSERVER = typeof window === 'undefined'

  if (!ISSERVER) {
    return localStorage.getItem(key)
  }
}
