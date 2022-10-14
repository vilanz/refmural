
export const getDataURLFromFile = async (file: File): Promise<string> => {
  return await new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = function (e) {
      resolve(e.target!.result! as string)
    }
    reader.readAsDataURL(file)
  })
}
