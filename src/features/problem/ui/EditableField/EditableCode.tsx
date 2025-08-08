import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { ProgrammingLanguageSelect } from "@ui";
import { ProblemSolution } from "@entities";
import { observer } from "mobx-react-lite";
import { problemEditorStore } from "../../model/problemEditor.store";
import { AvailableProgrammingLanguages } from "@constants/languages";

interface EditableCodeProps {
  value: ProblemSolution;
}

export const EditableCode: React.FC<EditableCodeProps> = observer(({
  value = "",
}) => {

  const { currentLanguage, code, setLanguage, setCode } = problemEditorStore;

  const handleChangeCode = (v: string | undefined) => {
    //timer in future
    if (v) {
      setCode(v);
    }
  };

  const handleLanguageChange = (v: AvailableProgrammingLanguages) => {
    setLanguage(v);
  }

  useEffect(() => {
    setCode(value[currentLanguage]);
  }, [value, currentLanguage]);

  return (
    <div>
      <ProgrammingLanguageSelect language={currentLanguage} onChange={handleLanguageChange} />

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
