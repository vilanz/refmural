import { fabric } from 'fabric'
import { ChangeEvent } from 'react'
import './App.css'
import { Canvas } from './canvas'
import { useMural } from './use-mural'

export const App = () => {
  const mural = useMural()

  const addImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file !== null && file !== undefined) {
      fabric.Image.fromURL(URL.createObjectURL(file), (img) => {
        mural.fabricCanvas?.add(img)
      })
    }
  }

  return (
    <div>
      <h1>Refmural</h1>
      <input type="file" onChange={addImage} />
      <Canvas mural={mural} />
    </div>
  )
}
