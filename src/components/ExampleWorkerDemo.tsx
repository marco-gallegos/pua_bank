import { useEffect, useRef, useState } from 'react'

export default function ExampleWorkerDemo() {
  const [result, setResult] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    // Crear el worker como módulo — Vite resuelve correctamente new URL(..., import.meta.url)
    const worker = new Worker(new URL('../workers/example.worker.ts', import.meta.url), { type: 'module' })

    worker.onmessage = (e: MessageEvent) => {
      const data = e.data as any
      if (data?.cmd === 'result') {
        setResult(data.result)
        setRunning(false)
      }
    }

    workerRef.current = worker

    return () => {
      worker.terminate()
      workerRef.current = null
    }
  }, [])

  const startCompute = () => {
    if (!workerRef.current) return
    setRunning(true)
    setResult(null)
    // Enviar un número aleatorio al worker
    const value = Math.floor(Math.random() * 1000)
    workerRef.current.postMessage({ cmd: 'compute', value })
  }

  return (
    <div className="mb-3">
      <h6 className="mb-2">WebWorker Demo</h6>
      <div className="d-flex align-items-center">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={startCompute}
          disabled={running}
        >
          {running ? 'Running...' : 'Compute (worker)'}
        </button>
        <div className="ms-3">
          {result === null ? (
            <span className="text-muted">No result yet</span>
          ) : (
            <span>Result: <strong>{result}</strong></span>
          )}
        </div>
      </div>
      <div className="small text-muted mt-1">This runs a simple computation inside a Web Worker (example).</div>
    </div>
  )
}
