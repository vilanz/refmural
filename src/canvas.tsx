import { useEffect, useLayoutEffect, useRef } from 'react'
import { fabric } from 'fabric'

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)

  useLayoutEffect(() => {
    const updateCanvasSize = () => {
      const fabricCanvas = fabricCanvasRef.current!
      fabricCanvas.setWidth(window.innerWidth)
      fabricCanvas.calcOffset()
    }
    // desperately needs throttling
    window.addEventListener('resize', updateCanvasSize)
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      backgroundColor: 'grey'
    })

    fabric.Image.fromURL('https://i.imgur.com/cZsD57S.png', (img) => {
      fabricCanvas.add(img)
    })

    fabricCanvasRef.current = fabricCanvas
    return () => {
      fabricCanvas.dispose()
    }
  }, [])

  return (
        <canvas height={400} width={400} ref={canvasRef} />
  )
}
