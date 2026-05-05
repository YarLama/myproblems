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
  onChange: (newTests: ProblemTests) => void;
}

type TestRow = {
  input: string;
  output: string;
  id: string;
};

export const EditableTest: React.FC<EditableTestProps> = ({
  tests,
  onChange,
}) => {
  const [rows, setRows] = useState<TestRow[]>([]);
  const [errorId, setErrorId] = useState<{
    id: string;
    field: "input" | "output";
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const addRow = () => {
    setRows([
      ...rows,
      { input: "", output: "", id: `${Date.now()}` },
    ]);
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
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
    setRows(
      rows.map((row) => {
        return row.id === id
          ? { ...row, [field]: value }
          : row;
      }),
    );

    try {
      if (value.trim() !== "") {
        JSON.parse(`[${value}]`);
      }

      if (hasError(id, field)) {
        setErrorId(null);
      }
    } catch {
      setErrorId({ id, field });
    }
  };

  const saveChanges = () => {
    setErrorId(null);
    try {
      const newTests: ProblemTests = {
        input: rows.map((row) =>
          JSON.parse(`[${row.input}]`),
        ),
        output: rows.map((row) => {
          const value = `${row.output.trim() !== "" ? row.output : "[]"}`;
          return JSON.parse(value);
        }),
      };
      onChange(newTests);
    } catch (e) {
      console.error(
        "EditableTest saveChanges error: ",
        (e as Error).message,
      );
    }
  };

  const handleEditClick = () => {
    if (rows.length === 0) {
      addRow();
    }
  };

  const handleCancel = () => {
    setRows(
      tests.input.map((input, i) => ({
        input: displayValue(JSON.stringify(input)),
        output: JSON.stringify(tests.output[i]),
        id: `row-${i}`,
      })),
    );
  };

  useEffect(() => {
    setRows(
      tests.input.map((input, i) => ({
        input: displayValue(JSON.stringify(input)),
        output: JSON.stringify(tests.output[i]),
        id: `row-${i}`,
      })),
    );
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
        {isEditing && (
          <IconButton
            icon="add"
            size="sm"
            onClick={addRow}
          />
        )}
        <EditControls
          vertical
          isEditing={isEditing}
          onToggle={setIsEditing}
          onEdit={handleEditClick}
          onSave={saveChanges}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};
