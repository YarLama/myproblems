import { useEffect, useState } from "react";
// import Editor from "react-simple-code-editor";
// import { highlight, languages } from "prismjs";
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import Editor from "@monaco-editor/react";
interface EditableCodeProps {
  value: string;
  onChange: (value: string) => void;
}

export const EditableCode: React.FC<EditableCodeProps> = ({
  value,
  onChange,
}) => {
  const [code, setCode] = useState<string>(value);

  const handleChangeCode = (v: string) => {
    setCode(v);
    onChange(code);
  };

  useEffect(() => {
    setCode(value);
  }, [value]);

  return (
    <div>
      <Editor
        height="400px"
        defaultLanguage="javascript"
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
};
