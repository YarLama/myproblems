import { ProblemTests } from "@entities";
import { useEffect, useState } from "react";

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
  };

  const saveChanges = () => {
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
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditClick = () => {
    if (rows.length === 0) {
      addRow();
    }
    setIsEditing(true);
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
      {label ? (
        <label className="block text-gray-700">
          {label}
        </label>
      ) : null}
      <table className="w-full border max-w-2xl">
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
                      className="w-full bg-white p-2"
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
                      className="w-full bg-white p-2"
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
      {isEditing ? (
        <div className="flex gap-2 justify-center">
          <button onClick={addRow}>+</button>
          <button onClick={saveChanges}>save</button>
          <button onClick={() => setIsEditing(false)}>
            cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2 justify-center">
          <button onClick={handleEditClick}>
            {rows.length === 0 ? "add value" : "edit"}
          </button>
        </div>
      )}
    </div>
  );
};
