import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { fabric } from 'fabric'

const CanvasWrapper = styled.div`
  max-width: 100vw;
  max-height: 600px;
  overflow: scroll;
`

const CanvasElement = styled.canvas`
`

export const Canvas = () => {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)

  const setupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const newFabricCanvas = new fabric.Canvas(canvas, {
      width: 3000,
      height: 3000,
      backgroundColor: 'black'
    })
    setFabricCanvas(newFabricCanvas)

    fabric.Image.fromURL('https://i.imgur.com/cZsD57S.png', (img) => {
      newFabricCanvas?.add(img)
    })
  }, [])

  return (
    <CanvasWrapper>
      <CanvasElement ref={setupCanvas} />
    </CanvasWrapper>
  )
}
