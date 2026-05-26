import { ProblemTests } from "@entities";
import { EditControls, IconButton } from "@ui";
import clsx from "clsx";
import { useEffect, useState } from "react";

const cellClasses = clsx([
  "flex items-center gap-2 transition-colors",
  "h-full",
  "p-2",
  "border border-[var(--color-secondary)]",
  "focus-within:bg-[var(--color-secondary)] focus-within:border-[var(--color-text)]",
]);
const errorCellClasses = clsx([
  "border-red-500",
  "text-red-500",
  "ring-1",
  "ring-red-500",
  "bg-red-50",
]);
const inputFieldClasses =
  "flex-1 min-w-0 bg-transparent border-none outline-none p-0 focus:ring-0";

interface EditableTestProps {
  tests: ProblemTests;
  defaultEditingState?: boolean;
  isHaveEditControls?: boolean;
  isHaveAutoFocus?: boolean;
  onChange: (newTests: ProblemTests) => void;
}

type TestRow = {
  input: string;
  output: string;
  id: string;
};

export const EditableTest: React.FC<EditableTestProps> = ({
  tests,
  defaultEditingState = false,
  isHaveEditControls = true,
  isHaveAutoFocus = true,
  onChange,
}) => {
  const [rows, setRows] = useState<TestRow[]>([]);
  const [errorId, setErrorId] = useState<{
    id: string;
    field: "input" | "output";
  } | null>(null);
  const [isEditing, setIsEditing] = useState(
    defaultEditingState,
  );

  const getUpdatedTests = (
    currentRows: TestRow[],
  ): ProblemTests | undefined => {
    return {
      input: currentRows.map((row) =>
        JSON.parse(`[${row.input}]`),
      ),
      output: currentRows.map((row) => {
        const value = `${row.output.trim() !== "" ? row.output : "[]"}`;
        return JSON.parse(value);
      }),
    };
  };

  const addRow = () => {
    const lastEl = rows.at(-1);
    if (lastEl?.input === "" && lastEl?.output === "")
      return;
    const updatedRows = [
      ...rows,
      { input: "", output: "", id: `${Date.now()}` },
    ];
    setRows(updatedRows);

    if (defaultEditingState && !isHaveEditControls) {
      const newTests = getUpdatedTests(updatedRows);
      if (newTests) onChange(newTests);
    }
  };

  const deleteRow = (id: string) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);

    if (defaultEditingState && !isHaveEditControls) {
      const newTests = getUpdatedTests(updatedRows);
      if (newTests) onChange(newTests);
    }
  };

  const displayValue = (value: string) => {
    const condition =
      value.trim().startsWith("[") &&
      value.trim().endsWith("]");

    return condition ? value.slice(1, -1) : value;
  };

  const hasError = (
    id: string,
    field: "input" | "output",
  ): boolean => {
    const errorCondition =
      errorId?.id === id && errorId.field === field;
    return errorCondition;
  };

  const updateRow = (
    id: string,
    field: "input" | "output",
    value: string,
  ) => {
    const updatedRows = rows.map((row) => {
      return row.id === id
        ? { ...row, [field]: value }
        : row;
    });
    setRows(updatedRows);

    try {
      if (value.trim() !== "") {
        if (field === "input") {
          JSON.parse(`[${value}]`);
        }
        if (field === "output") {
          JSON.parse(value);
        }
      }

      if (defaultEditingState && !isHaveEditControls) {
        const newTests = getUpdatedTests(updatedRows);
        if (newTests) onChange(newTests);
      }

      if (hasError(id, field)) {
        setErrorId(null);
      }
    } catch {
      setErrorId({ id, field });
    }
  };

  const saveChanges = () => {
    try {
      const newTests = getUpdatedTests(rows);
      if (newTests) onChange(newTests);
      setErrorId(null);
      setIsEditing(false);
    } catch (e) {
      console.error(
        "EditableTest saveChanges error: ",
        (e as Error).message,
      );
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (rows.length === 0) {
      addRow();
    }
  };

  const handleCancel = () => {
    const updatedRows = tests.input.map((input, i) => ({
      input: displayValue(JSON.stringify(input)),
      output: JSON.stringify(tests.output[i]),
      id: `row-${i}`,
    }));
    setRows(updatedRows);
    setIsEditing(false);
    setErrorId(null);
  };

  const handleCopyClick = () => {
    const template_input = "{{I}}";
    const template_output = "{{O}}";
    const preset: string = `console.log(solution(${template_input})); //${template_output}`;
    const copiedText = rows
      .map((el) => {
        const replaceInput = preset
          .split(template_input)
          .join(el.input);
        const replaceOutput = replaceInput
          .split(template_output)
          .join(el.output);
        return replaceOutput;
      })
      .join("\n");
    navigator.clipboard.writeText(copiedText);
  };

  useEffect(() => {
    const { input, output } = tests;

    if (input.length === 1 && output.length === 0) {
      setRows([{ input: "", output: "", id: `row-0` }]);
    } else {
      setRows(
        input.map((input, i) => ({
          input: displayValue(JSON.stringify(input)),
          output:
            Array.isArray(output[i]) &&
              output[i].length === 0
              ? ""
              : JSON.stringify(output[i]),
          id: `row-${i}`,
        })),
      );
    }
  }, [tests]);

  return (
    <div className="space-y-3 grid grid-cols-[1fr_auto] gap-4">
      <table className="w-full max-w-2xl table-fixed border-collapse">
        <thead>
          <tr className="bg-[var(--color-secondary)] border border-[var(--color-secondary)]">
            <th className="w-1/2 p-2 ">Input</th>
            <th className="w-1/2 p-2 ">Expected Output</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              {isEditing ? (
                <>
                  <td className="w-1/2 h-px">
                    <div
                      className={clsx([
                        cellClasses,
                        hasError(row.id, "input")
                          ? errorCellClasses
                          : "",
                      ])}
                    >
                      <input
                        value={row.input}
                        className={inputFieldClasses}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "input",
                            e.target.value,
                          )
                        }
                        autoFocus={
                          isHaveAutoFocus &&
                          index + 1 === rows.length &&
                          row.input === ""
                        }
                      />
                    </div>
                  </td>
                  <td className="w-1/2 h-px">
                    <div
                      className={clsx([
                        cellClasses,
                        hasError(row.id, "output")
                          ? errorCellClasses
                          : "",
                      ])}
                    >
                      <input
                        value={row.output}
                        className={inputFieldClasses}
                        onChange={(e) =>
                          updateRow(
                            row.id,
                            "output",
                            e.target.value,
                          )
                        }
                      />
                      <div className="shrink-0">
                        <IconButton
                          icon="delete"
                          size="sm"
                          onClick={() => deleteRow(row.id)}
                        />
                      </div>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="w-1/2 p-2 border border-[var(--color-secondary)] break-all whitespace-pre-wrap">
                    {row.input}
                  </td>
                  <td className="w-1/2 p-2 border border-[var(--color-secondary)] break-all whitespace-pre-wrap">
                    {row.output}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 items-start flex-col">
        {isEditing ? (
          <IconButton
            icon="add"
            size="sm"
            onClick={addRow}
          />
        ) : (
          <IconButton
            icon="copy"
            size="sm"
            onClick={handleCopyClick}
          />
        )}
        {isHaveEditControls && (
          <EditControls
            vertical
            isEditing={isEditing}
            onEdit={handleEditClick}
            onSave={saveChanges}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
