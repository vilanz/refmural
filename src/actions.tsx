import styled from '@emotion/styled'
import { Mural } from './use-mural'

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 160px;
  background-color: var(--lightgrey);
  padding: 10px;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  z-index: 10;
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
      <button onClick={promptAddingAnImage}>Add Image</button>
      <button onClick={mural.saveCanvas}>Save canvas</button>
      <button onClick={mural.loadSavedCanvas}>Load canvas</button>
    </Wrapper>
  )
}
