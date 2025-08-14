import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { ProgrammingLanguageSelect } from "@ui";
import { ProblemSolution } from "@entities";
import { observer } from "mobx-react-lite";
import { problemEditorStore } from "../../model/problemEditor.store";
import { AvailableProgrammingLanguages } from "@constants/languages";

interface EditableCodeProps {
  solution: ProblemSolution;
}

export const EditableCode: React.FC<EditableCodeProps> =
  observer(({ solution }) => {

    const { currentLanguage, code, setLanguage, setCode } =
      problemEditorStore;

    const handleChangeCode = (v: string | undefined) => {
      /*
       * При изменении кода в редакторе,
       * должен запускаться setTimeout ?
       * Который после некоторой задержки, должен
       * делать изменения в бд и problem сторе,
       * 
       * Задержка должна быть такой, чтобы печатая
       * новый код, код сохранялся через адекватное
       * количество времени. Возможно 3-4с, при 
       * нажатию на любую кнопку таймер должен сбрасываться
       */
      if (v) {
        setCode(v);
        const newSolution = {
          ...solution,
          [currentLanguage]: v,
        };
        console.log(newSolution);
      }
    };

    const handleLanguageChange = (
      v: AvailableProgrammingLanguages,
    ) => {
      /*
       * Если менять язык, нужно делать проверку, что если
       * текст кода не пустой или очень маленький, то
       * вызывать функцию сохранения изменений в бд.
       *
       * При закрытии вкладки, ничего не делать. Но если вдруг
       * захочется сохранять изменения при закрытии вкладки,
       * то нужно воспользоваться navigator.sendBeacon
       *
       */
      if (solution[v]) {
        setCode(solution[v]);
      } else {
        setCode("");
      }
      setLanguage(v);
    };

    useEffect(() => {
      if (solution[currentLanguage]) {
        setCode(solution[currentLanguage]);
      }
    }, []);

    return (
      <div>
        <ProgrammingLanguageSelect
          language={currentLanguage}
          onChange={handleLanguageChange}
        />
        <Editor
          height="400px"
          defaultLanguage="plaintext"
          value={code}
          theme="vs-dark"
          onChange={handleChangeCode}
          options={{
            lineNumbers: "on", // Включить номера строк
            minimap: { enabled: false }, // Отключить мини-карту
            fontSize: 14,
            wordWrap: "on", // Перенос строк
            scrollBeyondLastLine: false,
            automaticLayout: true, // Автоматический размер
          }}
        />
      </div>
    );
  });
