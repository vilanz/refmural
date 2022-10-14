import { ChangeEvent } from 'react'
import { Canvas } from './canvas'
import { useMural } from './use-mural'
import { createRoot } from 'react-dom/client'
import './index.css'

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
      <h1>Refmural</h1>
      <input type="file" onChange={addImage} />
      <Canvas mural={mural} />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <App />
)
