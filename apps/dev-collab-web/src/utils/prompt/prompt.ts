export const usePrompt = () => {
  const alert = (msg: string) => {
    window.alert(msg)
  }

  return { alert }
}
