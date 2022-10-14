import styled from '@emotion/styled'
import { Mural } from './use-mural'

const CanvasWrapper = styled.div`
  max-width: 100vw;
  max-height: 600px;
  overflow: scroll;
`

const CanvasElement = styled.canvas`
`

interface CanvasProps {
  mural: Mural
}

export const Canvas = ({ mural }: CanvasProps) => {
  return (
    <CanvasWrapper>
      <CanvasElement ref={mural.setupCanvas} />
    </CanvasWrapper>
  )
}
