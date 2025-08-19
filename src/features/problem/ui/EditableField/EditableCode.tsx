import { useEffect, useRef } from "react";
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
    const timeoutChangeRef = useRef<NodeJS.Timeout | null>(
      null,
    );
    const { currentLanguage, code, setLanguage, setCode } =
      problemEditorStore;

    const handleChangeCode = (v: string | undefined) => {
      if (timeoutChangeRef.current !== null) {
        clearTimeout(timeoutChangeRef.current);
        timeoutChangeRef.current = null;
      }
      const hadContentPreviously = code.trim().length > 0;
      const isValueHasContent = v && v.trim().length > 0;
      const delay = 3000;
      const condition =
        v !== undefined &&
        (isValueHasContent ||
         (!isValueHasContent && hadContentPreviously));

      setCode(v || "");

      if (condition) {
        timeoutChangeRef.current = setTimeout(() => {
          /*
            * 
            * Сюда добавить функцию сохранения в бд
            * Также стоит подумать о том, что если
            * был условно солюшн { 'javascript': '1234'},
            * а потом пользователь стёр значения до { 'javascript': ''},
            * то наоборот удалять ключ 'javascript' из solution
            *
          */
          console.log("2sec over. Code to save: ", v);
        }, delay);
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
      if (timeoutChangeRef.current) {

        console.log(timeoutChangeRef.current, currentLanguage, code)
        //сохранить в бд code, что то типа bd.save({...solution, [currentLanguage]: code})
      
        clearTimeout(timeoutChangeRef.current);
        timeoutChangeRef.current = null;
      }

      setCode(solution[v] || "")
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
            lineNumbers: "on", 
            minimap: { enabled: false }, 
            fontSize: 14,
            wordWrap: "on", 
            scrollBeyondLastLine: false,
            automaticLayout: true, 
          }}
        />
      </div>
    );
  });
