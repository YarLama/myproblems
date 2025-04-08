import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import clsx from "clsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex">
        <div
          className={clsx([
            "bg-blue-200",
            "text-4xl",
            "text-red-200",
            "h-10",
            "m:h-40",
          ])}
        >
          test
        </div>
        <div
          className={clsx(
            "flex",
            "m:bg-red-500",
            "m:h-20",
            "m:text-8xl",
            "m:font-bold",
            "m:text-blue-500",
            "h-10",
            "flex-auto",
            "bg-blue-500",
          )}
        >
          tett asdas asdasdasdasdasdasdas asdasd asd
        </div>
        <div className="flex-auto bg-red-500"></div>
        <div className="flex-auto bg-yellow-500"></div>
      </div>
      <div className="flex">
        <a href="https://vite.dev" target="_blank" className="w-14 flex-auto">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="w-64 flex-2">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="bg-white text-8xl">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="text-2xl underline">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
