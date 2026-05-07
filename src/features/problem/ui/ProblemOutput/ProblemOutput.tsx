import { ProblemTests, useExecuteCode } from "@entities";
import { EditableText } from "../EditableField/EditableText";
import { toJS } from "mobx";
import { useState } from "react";
import { IconButton } from "@ui";

interface ProblemOutputProps {
  code: string;
  tests: ProblemTests;
}

export const ProblemOutput: React.FC<
  ProblemOutputProps
> = ({ tests, code }) => {
  const [output, setOutput] = useState<string>("");
  const { mutate: execute, isPending: isExecuting } =
    useExecuteCode({
      onSuccess: (result) => {
        const outputString = result.stdout
          .map((res) => {
            if (res.status === "success") {
              if (res.testStatus === "success") {
                return `${res.testIndex}:${res.testStatus}. ${res.output}`;
              }
              if (res.testStatus === "failed") {
                return `${res.testIndex}:${res.testStatus}. Expected ${res.testExpected}, and return ${res.output}`;
              }
            }
            if (res.status === "error") {
              return `${res.testIndex}:error runtime: ${res.error}`;
            }
          })
          .join("\n");
        setOutput(outputString);

        if (result.stderr) {
          setOutput(result.stderr);
        }
      },
      onError: (error) => {
        setOutput(`Error: ${error.message}`);
      },
    });

  const handleCheckClick = async () => {
    if (tests.input && tests.output && code.trim()) {
      execute({
        code: code,
        tests: toJS(tests),
      });
    }
  };

  return (
    <div className="flex flex-row items-start gap-2">
      <div className="flex-1 h-[300px] m:h-[200px]">
        <EditableText
          value={isExecuting ? "Executing..." : output}
          defaultEditingState
          isMultiline
          isHaveEditControls={false}
          disabled
        />
      </div>
        <IconButton icon="search" size="sm" onClick={handleCheckClick} />
    </div>
  );
};
