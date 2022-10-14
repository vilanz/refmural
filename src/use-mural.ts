import { useCallback, useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { getDataURLFromFile } from './utils'

const getLocalStorageKeyForIndex = (index: number) => `fabric-canvas-${index}`

export const useMural = () => {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
  const [selectedCanvasIndex, setSelectedCanvasIndex] = useState(1)

  const setupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    setFabricCanvas(new fabric.Canvas(canvas, {
      width: 3000,
      height: 3000,
      skipOffscreen: true,
      targetFindTolerance: 50,
      // @ts-expect-error using fabric's Pattern itself is pretty slow, but this is fast
      backgroundColor: { source: './pattern.png', repeat: 'repeat' }
    }))
  }, [])

  useEffect(() => {
    if (fabricCanvas !== null) {
      void loadSavedCanvas(selectedCanvasIndex)
    }
  }, [fabricCanvas, selectedCanvasIndex])

  const isDraggingRef = useRef(false)
  const lastPosX = useRef(0)
  const lastPosY = useRef(0)
  useEffect(() => {
    if (fabricCanvas === null) {
      return
    }
    // Panning and zoom code adapted from http://fabricjs.com/fabric-intro-part-5
    // Pan
    fabricCanvas.on('mouse:down', (opt) => {
      const { e } = opt
      const clickedOnImage = fabricCanvas.findTarget(e, false) !== undefined
      if (clickedOnImage) {
        return
      }
      isDraggingRef.current = true
      fabricCanvas.selection = false
      lastPosX.current = e.clientX
      lastPosY.current = e.clientY
    })
    fabricCanvas.on('mouse:move', (opt) => {
      if (!isDraggingRef.current) {
        return
      }
      const { e } = opt
      fabricCanvas.viewportTransform![4] += e.clientX - lastPosX.current
      fabricCanvas.viewportTransform![5] += e.clientY - lastPosY.current
      fabricCanvas.requestRenderAll()
      lastPosX.current = e.clientX
      lastPosY.current = e.clientY
    })
    fabricCanvas.on('mouse:up', () => {
      fabricCanvas.setViewportTransform(fabricCanvas.viewportTransform!)
      fabricCanvas.selection = true
      isDraggingRef.current = false
    })
    // Zoom
    fabricCanvas.on('mouse:wheel', (opt) => {
      const { e } = opt
      let zoom = fabricCanvas.getZoom() * (0.999 ** e.deltaY)
      if (zoom > 20) zoom = 20
      if (zoom < 0.01) zoom = 0.01
      fabricCanvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom)
      e.preventDefault()
      e.stopPropagation()
    })
  }, [fabricCanvas])

  const addImage = useCallback(async (file: File) => {
    const fileDataURL = await getDataURLFromFile(file)
    fabric.Image.fromURL(fileDataURL, (img) => {
      fabricCanvas?.add(img)
      saveCanvas()
    })
  }, [fabricCanvas])

  const saveCanvas = () => {
    const fabricCanvasJsonString = JSON.stringify(fabricCanvas?.toJSON())
    localStorage.setItem(getLocalStorageKeyForIndex(selectedCanvasIndex), fabricCanvasJsonString)
  }

  const loadSavedCanvas = useCallback(async (index: number) => {
    const fabricCanvasJsonString = localStorage.getItem(getLocalStorageKeyForIndex(index))
    if (fabricCanvasJsonString !== null) {
      fabricCanvas?.loadFromJSON(JSON.parse(fabricCanvasJsonString), () => {
        fabricCanvas.renderAll()
      })
    } else {
      // fabricCanvas.clear() will clear even the background
      fabricCanvas?.forEachObject((obj) => fabricCanvas.remove(obj))
    }
  }, [fabricCanvas])

  return {
    fabricCanvas,
    setupCanvas,
    addImage,
    saveCanvas,
    loadSavedCanvas,
    setSelectedCanvasIndex
  }
}

export type Mural = ReturnType<typeof useMural>
