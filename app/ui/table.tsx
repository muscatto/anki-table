"use client";
import { useEffect, useState } from "react";
import TableCard from "./table-card";
import {
  AddButton,
  DeleteButton,
  EditButton,
  HeadStatusButton,
  HideButton,
  ResetButton,
} from "./buttons";
import TableHeadCard from "./table-head-card";

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
    showHead: boolean;
  };
}

export default function Table() {
  const initialItems = {
    head: {
      col: ["a", "b", "c", "d"],
      row: ["1", "2", "3"],
    },
    body: [
      [
        { text: "a1", isDisplayed: true },
        { text: "b1", isDisplayed: true },
        { text: "c1", isDisplayed: true },
      ],
      [
        { text: "a2", isDisplayed: true },
        { text: "b2", isDisplayed: true },
        { text: "c2", isDisplayed: true },
      ],
      [
        { text: "a3", isDisplayed: true },
        { text: "b3", isDisplayed: true },
        { text: "c3", isDisplayed: true },
      ],
    ],
    options: {
      showHead: true,
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

  const changeHeadStatus = () => {
    const newItems = { ...tableItems };
    newItems.options.showHead = !newItems.options.showHead;
    updateTable(newItems);
  };

  const changeTableBody = (row: number, col: number, newText: string): void => {
    const newItems = { ...tableItems };
    newItems.body[row][col].text = newText;
    updateTable(newItems);
  };

  const changeTableBodyShow = (row: number, col: number): void => {
    const newItems = { ...tableItems };
    for (let i = 0; i < newItems.body.length; i++) {
      for (let j = 0; j < newItems.body[i].length; j++) {
        if (i === row && j === col) {
          newItems.body[i][j].isDisplayed = !newItems.body[i][j].isDisplayed;
          updateTable(newItems);
          return;
        }
      }
    }
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
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {!isEditing && <HideButton onHideClick={handleHideAll} />}
        {isEditing && <HeadStatusButton changeHeadStatus={changeHeadStatus} />}
        {isEditing && (
          <ResetButton
            resetTable={() => {
              updateTable(initialItems);
            }}
          />
        )}
        <EditButton
          isEditing={isEditing}
          changeEditMode={() => {
            setIsEditing((prev) => !prev);
          }}
        />
      </div>
      <div className="flex w-screen overflow-auto p-3">
        <div className="flex flex-col gap-2 text-lg mx-auto">
          {tableItems.options.showHead && (
            <div className="flex gap-2">
              {tableItems.head.col.map((thText, i) => {
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
            </div>
          )}
          {tableItems.body.map((trItem, i) => {
            return (
              <div key={"b" + i} className="flex gap-2">
                {tableItems.options.showHead && (
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
              </div>
            );
          })}
        </div>
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
    </>
  );
}
