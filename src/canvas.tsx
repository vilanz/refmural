import { useEffect, useRef } from "react"
import { fabric } from "fabric";

export const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth,
        backgroundColor: 'grey'
      });

      const circle = new fabric.Circle({
        radius: 20, fill: 'green', left: 100, top: 100,
      });

      canvas.add(circle)

      return () => {
        canvas.dispose();
      }
    }, []);

    return (
        <canvas height={400} width={400} ref={canvasRef} />
    )
}