import { useEffect, useRef } from "react";
import { Editor, type OnMount } from "@monaco-editor/react";
import { ProgrammingLanguageSelect } from "@ui";
import { ProblemSolution } from "@entities";
import { observer } from "mobx-react-lite";
import { problemEditorStore } from "../../model/problemEditor.store";
import { AvailableProgrammingLanguages } from "@constants/languages";
import { problemStore } from "../../model/problems.store";

type IStandaloneCodeEditor = Parameters<OnMount>[0];

interface EditableCodeProps {
  solution: ProblemSolution;
  isDebounced?: boolean;
  isAutoSave?: boolean;
  onChangeCode?: (value: ProblemSolution) => void;
}

export const EditableCode: React.FC<EditableCodeProps> =
  observer(
    ({
      solution,
      isDebounced = true,
      isAutoSave = false,
      onChangeCode,
    }) => {
      const timeoutChangeRef =
        useRef<NodeJS.Timeout | null>(null);
      const editorRef =
        useRef<IStandaloneCodeEditor | null>(null);
      const { currentProblem, editProblem } = problemStore;
      const {
        currentLanguage,
        code,
        setLanguage,
        setCode,
      } = problemEditorStore;

      const saveSolution = (value: string) => {
        if (currentProblem && currentLanguage) {
          const newProblem = {
            ...currentProblem,
            solution: {
              ...currentProblem.solution,
            },
          };

          if (value.trim() === "") {
            delete newProblem.solution[currentLanguage];
            const remainingLanguages = Object.keys(
              newProblem.solution,
            );
            if (remainingLanguages.length === 0) {
              setLanguage("javascript");
            }
          } else {
            newProblem.solution[currentLanguage] = value;
          }
          editProblem(newProblem);
        }
      };

      const resetTimer = (
        callbackBefore?: () => void,
        callbackAfter?: () => void,
      ) => {
        if (timeoutChangeRef.current) {
          if (callbackBefore) callbackBefore();
          clearTimeout(timeoutChangeRef.current);
          timeoutChangeRef.current = null;
          if (callbackAfter) callbackAfter();
        }
      };

      const handleChangeCode = (v: string | undefined) => {
        if (isDebounced) {
          resetTimer();
          const hadContentPreviously =
            code.trim().length > 0;
          const isValueHasContent =
            v && v.trim().length > 0;
          const delay = 3000;
          const condition =
            v !== undefined &&
            (isValueHasContent ||
              (!isValueHasContent && hadContentPreviously));

          setCode(v || "");

          if (condition) {
            timeoutChangeRef.current = setTimeout(() => {
              if (isAutoSave) saveSolution(v);
            }, delay);
          }
        }
        onChangeCode?.({ ...currentProblem?.solution, [currentLanguage]: v });
      };

      const handleLanguageChange = (
        v: AvailableProgrammingLanguages,
      ) => {
        if (isDebounced)
          resetTimer(() => saveSolution(code));
        setCode(solution[v] || "");
        setLanguage(v);
        if (editorRef.current) editorRef.current.focus();
      };

      useEffect(() => {
        const availableLanguages = Object.keys(
          solution || {},
        );
        if (availableLanguages.includes(currentLanguage)) {
          setCode(solution[currentLanguage] || "");
        } else if (availableLanguages.length > 0) {
          const firstAvailableLanguage =
            availableLanguages[0] as AvailableProgrammingLanguages;
          setLanguage(firstAvailableLanguage);
          setCode(solution[firstAvailableLanguage] || "");
        } else {
          setLanguage("javascript");
          setCode("");
        }

        resetTimer();
      }, [solution]);

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
            onMount={(ed) => (editorRef.current = ed)}
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
    },
  );
