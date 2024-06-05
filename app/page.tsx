"use client";
import { useEffect, useState } from "react";
import {
  AddButton,
  DeleteButton,
  EditButton,
  HeadStatusButton,
  HideButton,
  ResetButton,
} from "./ui/buttons";
import TableHeadCard from "./ui/table-head-card";
import TableCard from "./ui/table-card";

interface TableItems {
  head: {
    col: string[];
    row: string[];
  };
  body: {
    text: string;
    isDisplayed: boolean;
  }[][];
  options: {
    showTopHead: boolean;
    showLeftHead: boolean;
  };
}

export default function Home() {
  const initialItems = {
    head: {
      col: ["a", "b", "c", "d"],
      row: ["1", "2", "3"],
    },
    body: [
      [
        { text: "b1", isDisplayed: true },
        { text: "c1", isDisplayed: true },
        { text: "d1", isDisplayed: true },
      ],
      [
        { text: "b2", isDisplayed: true },
        { text: "c2", isDisplayed: true },
        { text: "d2", isDisplayed: true },
      ],
      [
        { text: "b3", isDisplayed: true },
        { text: "c3", isDisplayed: true },
        { text: "d3", isDisplayed: true },
      ],
    ],
    options: {
      showTopHead: true,
      showLeftHead: true,
    },
  };

  const [isEditing, setIsEditing] = useState(false);
  const [tableItems, setTableItems] = useState<TableItems>(initialItems);

  useEffect(() => {
    if (localStorage.getItem("anki-table") !== null) {
      const savedItems: TableItems = JSON.parse(
        localStorage.getItem("anki-table")!
      );
      setTableItems(savedItems);
    }
  }, []);

  const updateTable = (newItems: TableItems) => {
    setTableItems(newItems);
    localStorage.setItem("anki-table", JSON.stringify(newItems));
  };

  const changeHeadStatus = (position: 'top' | 'left') => {
    const newItems = { ...tableItems };
    if (position === 'top') {
      newItems.options.showTopHead = !newItems.options.showTopHead;
    }
    if (position === 'left') {
      newItems.options.showLeftHead = !newItems.options.showLeftHead;
    }
    updateTable(newItems);
  };

  const changeTableBody = (row: number, col: number, newText: string): void => {
    const newItems = { ...tableItems };
    newItems.body[row][col].text = newText;
    updateTable(newItems);
  };

  const changeTableBodyShow = (row: number, col: number): void => {
    const newItems = { ...tableItems };
    newItems.body[row][col].isDisplayed = !newItems.body[row][col].isDisplayed;
    updateTable(newItems);
  };

  const changeHead = (
    id: number,
    text: string,
    headType: "col" | "row"
  ): void => {
    const newItems = { ...tableItems };
    if (headType === "col") {
      newItems.head.col[id] = text;
    }
    if (headType === "row") {
      newItems.head.row[id] = text;
    }
    updateTable(newItems);
  };

  const handleAddColumnClick = () => {
    const newItems = { ...tableItems };
    newItems.head.col.push("");
    newItems.body.forEach((rowArr) => {
      rowArr.push({ text: "", isDisplayed: true });
    });
    updateTable(newItems);
  };

  const handleDelColumnClick = () => {
    if (tableItems.head.col.length < 3) {
      return;
    }
    const newItems = { ...tableItems };
    newItems.head.col.pop();
    newItems.body.forEach((rowArr) => {
      rowArr.pop();
    });
    updateTable(newItems);
  };

  const handleAddRowClick = () => {
    const newItems = { ...tableItems };
    newItems.head.row.push("");
    const newRow: {
      text: string;
      isDisplayed: boolean;
    }[] = [];
    for (let i = 0; i < tableItems.body[0].length; i++) {
      newRow.push({ text: "", isDisplayed: true });
    }
    newItems.body.push(newRow);
    updateTable(newItems);
  };

  const handleDelRowClick = () => {
    if (tableItems.head.row.length < 2) {
      return;
    }
    const newItems = { ...tableItems };
    newItems.head.row.pop();
    newItems.body.pop();
    updateTable(newItems);
  };

  const handleHideAll = () => {
    const newItems = { ...tableItems };
    for (let i = 0; i < newItems.body.length; i++) {
      for (let j = 0; j < newItems.body[i].length; j++) {
        newItems.body[i][j].isDisplayed = false;
      }
    }
    updateTable(newItems);
  };

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-2 mb-5 px-3">
        <EditButton
          isEditing={isEditing}
          changeEditMode={() => {
            setIsEditing((prev) => !prev);
          }}
        />
        {isEditing ? (
          <>
            <HeadStatusButton onChangeHeadClick={() => {changeHeadStatus('top')}} text="列ラベル" />
            <HeadStatusButton onChangeHeadClick={() => {changeHeadStatus('left')}} text="行ラベル" />
            <ResetButton
              resetTable={() => {
                updateTable(initialItems);
              }}
            />
          </>
        ) : (
          <HideButton onHideClick={handleHideAll} />
        )}
      </div>

      <div className="flex w-screen overflow-auto px-3">
        <table className="text-lg border-separate border-spacing-2 mx-auto">
          <thead>
            {tableItems.options.showTopHead && (
              <tr>
                {tableItems.head.col.map((thText, i) => {
                  if (!tableItems.options.showLeftHead && i === 0) return;
                  return (
                    <TableHeadCard
                      key={"h" + i}
                      id={i}
                      text={thText}
                      isEditing={isEditing}
                      headType="col"
                      handleChangeHead={changeHead}
                    />
                  );
                })}
              </tr>
            )}
          </thead>

          <tbody>
            {tableItems.body.map((trItem, i) => {
              return (
                <tr key={"b" + i}>
                  {tableItems.options.showLeftHead && (
                    <TableHeadCard
                      id={i}
                      text={tableItems.head.row[i]}
                      isEditing={isEditing}
                      headType="row"
                      handleChangeHead={changeHead}
                    />
                  )}
                  {trItem.map((thItem, j) => {
                    return (
                      <TableCard
                        key={String(i) + String(j)}
                        row={i}
                        col={j}
                        content={thItem}
                        isEditing={isEditing}
                        changeTableBody={changeTableBody}
                        changeTableBodyShow={changeTableBodyShow}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {isEditing && (
          <div className="my-auto">
            <AddButton handleAddClick={handleAddColumnClick} />
            <DeleteButton handleDelClick={handleDelColumnClick} />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-center">
          <AddButton handleAddClick={handleAddRowClick} />
          <DeleteButton handleDelClick={handleDelRowClick} />
        </div>
      )}
    </main>
  );
}
