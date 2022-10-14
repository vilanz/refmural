import { ChangeEvent } from 'react'
import { Canvas } from './canvas'
import { useMural } from './use-mural'
import { createRoot } from 'react-dom/client'
import styled from '@emotion/styled'
import './index.css'

const Title = styled.span`
  position: absolute;
  font-size: 32px;
  font-weight: bold;
  top: 10px;
  left: 10px;
  z-index: 10;
`

const FileLabel = styled.label`
  position: absolute;
  top: 20px;
  left: 160px;
  z-index: 10;
`
const FileInput = styled.input`
  visibility: hidden;
`

const SaveButton = styled.button`
`

const LoadButton = styled.button`
`

export const App = () => {
  const mural = useMural()

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file !== null && file !== undefined) {
      mural.addFile(file)
    }
  }

  return (
    <div>
      <Title>Refmural</Title>
      <FileLabel htmlFor="file">Choose</FileLabel>
      <FileInput id="file" type="file" onChange={addImage} />
      <SaveButton onClick={mural.saveCanvas}>Save</SaveButton>
      <LoadButton onClick={mural.loadCanvas}>Load</LoadButton>
      <Canvas mural={mural} />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <App />
)
