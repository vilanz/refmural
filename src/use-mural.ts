import { useCallback, useEffect, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { getDataURLFromFile } from './utils'

export const LOCAL_STORAGE_CANVAS_SAVE_KEY = 'fabric-canvas'

export const useMural = () => {
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)

  const setupCanvas = useCallback((canvas: HTMLCanvasElement) => {
    setFabricCanvas(new fabric.Canvas(canvas, {
      width: 3000,
      height: 3000,
      skipOffscreen: true,
      targetFindTolerance: 50
    }))
  }, [])

  useEffect(() => {
    if (fabricCanvas !== null) {
      void loadSavedCanvas()
    }
  }, [fabricCanvas])

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
      if (fabricCanvas.findTarget(e, false) !== undefined) {
        return
      }
      isDraggingRef.current = true
      fabricCanvas.selection = false
      lastPosX.current = e.clientX
      lastPosY.current = e.clientY
    })
    fabricCanvas.on('mouse:move', (opt) => {
      if (isDraggingRef.current) {
        const { e } = opt
        fabricCanvas.viewportTransform![4] += e.clientX - lastPosX.current
        fabricCanvas.viewportTransform![5] += e.clientY - lastPosY.current
        fabricCanvas.requestRenderAll()
        lastPosX.current = e.clientX
        lastPosY.current = e.clientY
      }
    })
    fabricCanvas.on('mouse:up', () => {
      fabricCanvas.setViewportTransform(fabricCanvas.viewportTransform!)
      isDraggingRef.current = false
      fabricCanvas.selection = true
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
    })
  }, [fabricCanvas])

  const saveCanvas = () => {
    const fabricCanvasJsonString = JSON.stringify(fabricCanvas?.toJSON())
    localStorage.setItem(LOCAL_STORAGE_CANVAS_SAVE_KEY, fabricCanvasJsonString)
  }

  const loadSavedCanvas = useCallback(async () => {
    const fabricCanvasJsonString = localStorage.getItem(LOCAL_STORAGE_CANVAS_SAVE_KEY)
    if (fabricCanvasJsonString !== null) {
      fabricCanvas?.loadFromJSON(JSON.parse(fabricCanvasJsonString), () => {})
    }
  }, [fabricCanvas])

  return {
    fabricCanvas,
    setupCanvas,
    addImage,
    saveCanvas,
    loadSavedCanvas
  }
}

export type Mural = ReturnType<typeof useMural>
