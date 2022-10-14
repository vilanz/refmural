import styled from '@emotion/styled'
import { Mural } from './use-mural'

const CanvasWrapper = styled.div`
  width: 100vw;
  height: 100%;
  max-height: 100%;
  overflow: auto;
`

const CanvasElement = styled.canvas`
  width: 3000px;
  height: 3000px;
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
