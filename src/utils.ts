
// URL.createObjectURL() doesn't persist between sessions
export const getDataURLFromFile = async (file: File): Promise<string> => {
  // idk why ESLint is "fixing" this to use await? we don't need it
  return await new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function (e) {
      resolve(e.target!.result! as string)
    }
    reader.readAsDataURL(file)
  })
}
