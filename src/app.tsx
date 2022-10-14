import { createRoot } from 'react-dom/client'
import styled from '@emotion/styled'
import { Canvas } from './canvas'
import { useMural } from './use-mural'
import { Actions } from './actions'
import './index.css'

const Title = styled.span`
  position: absolute;
  font-size: 32px;
  font-weight: bold;
  top: 10px;
  left: 10px;
  z-index: 10;
`

export const App = () => {
  const mural = useMural()

  return (
    <div>
      <Title>Refmural</Title>
      <Actions mural={mural} />
      <Canvas mural={mural} />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <App />
)
