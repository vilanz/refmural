import { useCallback, useState } from 'react'
import { fabric } from 'fabric'

export const useMural = () => {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)

  const setupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    setFabricCanvas(new fabric.Canvas(canvas, {
      width: 3000,
      height: 3000,
      backgroundColor: 'black'
    }))
  }, [])

  return {
    fabricCanvas,
    setupCanvas
  }
}

export type Mural = ReturnType<typeof useMural>
