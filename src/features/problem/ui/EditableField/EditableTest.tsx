import { ProblemTests } from "@entities";
import { EditControls } from "@ui";
import { useEffect, useState } from "react";

const baseTdClasses = "w-full bg-white p-2";
const errorClasses =
  "border-red-500 text-red-500 ring-1 ring-red-500 bg-red-50";
const defaultClasses =
  "border-gray-300 focus:border-blue-500";

interface EditableTestProps {
  tests: ProblemTests;
  onChange: (newTests: ProblemTests) => void;
  label?: string;
}

type TestRow = {
  input: string;
  output: string;
  id: string;
};

export const EditableTest: React.FC<EditableTestProps> = ({
  tests,
  onChange,
  label,
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
        JSON.parse(value);
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
        input: rows.map((row) => JSON.parse(row.input)),
        output: rows.map((row) => JSON.parse(row.output)),
      };
      onChange(newTests);
    } catch (e) {
      console.log(
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
        input: JSON.stringify(input),
        output: JSON.stringify(tests.output[i]),
        id: `row-${i}`,
      })),
    );
  };

  useEffect(() => {
    setRows(
      tests.input.map((input, i) => ({
        input: JSON.stringify(input),
        output: JSON.stringify(tests.output[i]),
        id: `row-${i}`,
      })),
    );
  }, [tests]);

  return (
    <div className="space-y-3">
      <table className="w-full border max-w-2xl">
        {label && (
          <caption className="caption-top text-left text-gray-700 mb2">
            {label}
          </caption>
        )}
        <thead>
          <tr className="bg-gray-100">
            <th className="w-1/2 p-2 border">Input</th>
            <th className="w-1/2 p-2 border">
              Expected Output
            </th>
            {isEditing ? <th></th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              {isEditing ? (
                <>
                  <td className="w-1/2">
                    <input
                      value={row.input}
                      className={`
                        ${baseTdClasses} 
                        ${hasError(row.id, "input")
                          ? errorClasses
                          : defaultClasses
                        }
                      `}
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
                  </td>
                  <td className="w-1/2">
                    <input
                      value={row.output}
                      className={`
                        ${baseTdClasses} 
                        ${hasError(row.id, "output")
                          ? errorClasses
                          : defaultClasses
                        }
                      `}
                      onChange={(e) =>
                        updateRow(
                          row.id,
                          "output",
                          e.target.value,
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => deleteRow(row.id)}
                      className="text-red-500"
                    >
                      X
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="w-1/2 p-2 border break-all whitespace-pre-wrap">
                    {row.input}
                  </td>
                  <td className="w-1/2 p-2 border break-all whitespace-pre-wrap">
                    {row.output}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 justify-center">
        {isEditing && <button onClick={addRow}>+</button>}
        <EditControls
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
