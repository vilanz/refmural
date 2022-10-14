import styled from '@emotion/styled'
import { Mural } from './use-mural'

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 190px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  z-index: 10;
`

const Button = styled.button`
  outline: none;
  border: 2px solid black;
  padding: 5px 10px;
  border-radius: 5px;
  background: white;
  color: black;
  font-weight: bold;
`

interface ActionsProps {
  mural: Mural
}

export const Actions = ({ mural }: ActionsProps) => {
  const promptAddingAnImage = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    const onFileChange = () => {
      const file = fileInput.files?.[0]
      if (file) {
        void mural.addImage(file)
      }
      fileInput.removeEventListener('change', onFileChange)
    }
    fileInput.addEventListener('change', onFileChange)
    fileInput.click()
  }

  return (
    <Wrapper>
      <Button onClick={promptAddingAnImage}>Add image</Button>
      <Button onClick={mural.saveCanvas}>Save</Button>
      <Button onClick={mural.loadSavedCanvas}>Load</Button>
    </Wrapper>
  )
}
