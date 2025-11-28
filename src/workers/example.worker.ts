// Ejemplo de Web Worker (módulo)
// Escucha mensajes con forma { cmd: 'compute', value: number }
// Responde con { cmd: 'result', result: number }

self.onmessage = (event) => {
  const data = event.data as any
  if (!data || data.cmd !== 'compute') return

  const n = typeof data.value === 'number' ? data.value : 0

  // Simular trabajo pesado (pero breve) y calcular
  // Aquí hacemos un cálculo trivial: elevar al cuadrado
  // En un caso real podrías hacer procesamiento intensivo
  const result = n * n

  // Enviar resultado de vuelta al hilo principal
  // El worker en Vite usa postMessage normalmente
  // (self como any para evitar errores de tipo en TS estrictos)
  ;(self as any).postMessage({ cmd: 'result', result })
}
