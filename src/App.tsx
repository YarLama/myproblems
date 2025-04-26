import { IconButton, ScrollToTop } from "@ui";
import clsx from "clsx";
import { useRef } from "react";

function App() {

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col">
      <ScrollToTop thresholdY={200} />
      <h1>Test Icon</h1>
      <h1>Test #2</h1>
      <h1>Test #3</h1>
      <p>Test message</p>
      <IconButton icon="delete" className="w-48" />
      <div className="w-96 h-96 overflow-auto relative" ref={containerRef}>
        <div className="font-[Inter]">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-bold">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div>
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-sans">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-[Inter]">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-bold">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div>
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-sans">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-[Inter]">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-bold">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-bold">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-bold">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <div className="font-bold">
          Test text which must show font-family/ И сразу же
          на кириллице
        </div>
        <ScrollToTop containerRef={containerRef}/>
      </div>
      <span
        className={clsx([
          "material-symbols-outlined",
          "text-8xl",
          "animate-spin",
          "duration-300",
          "w-24",
        ])}
      >
        progress_activity
      </span>
      <span
        className={clsx([
          "material-icons",
          "text-8xl",
          "animate-spin",
          "duration-300",
          "w-24",
        ])}
      >
        add
      </span>
      <span
        className={clsx([
          "material-icons",
          "text-8xl",
          "animate-spin",
          "duration-300",
          "w-24",
        ])}
      >
        refresh
      </span>
      <span
        className={clsx([
          "material-icons",
          "text-8xl",
          "animate-spin",
          "duration-300",
          "w-24",
        ])}
      >
        cached
      </span>
      <span className={clsx(["material-icons"])}>
        autorenew
      </span>
      <span
        className={clsx([
          "material-icons",
          "m:active:text-red-500",
        ])}
      >
        calendar_month
      </span>
      <span className="material-icons">save</span>
      <span className="material-icons">menu</span>
      <span className="material-icons">logout</span>
      <span className="material-icons text-black hover:text-5xl hover:bg-black hover:text-white transition-all duration-300">
        home
      </span>
      <div className="house-icon">Icon</div>
      <div className="clock-icon">Icon</div>
      <div className="calendar-icon">Icon</div>
      <div>
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-sans">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-[Inter]">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-bold">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div>
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-sans">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-[Inter]">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-bold">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div>
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-sans">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-[Inter]">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-bold">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div>
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-sans">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-[Inter]">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
      <div className="font-bold">
        Test text which must show font-family/ И сразу же на
        кириллице
      </div>
    </div>
  );
}

export default App;
