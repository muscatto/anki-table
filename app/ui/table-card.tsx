"use client";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  row: number;
  col: number;
  content: { text: string; isDisplayed: boolean };
  isEditing: boolean;
  changeTableBody: (row: number, col: number, newText: string) => void;
  changeTableBodyShow: (row: number, col: number) => void;
}

export default function TableCard({
  row,
  col,
  content,
  isEditing,
  changeTableBody,
  changeTableBodyShow,
}: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {isEditing ? (
        <td>
          <textarea
            className="bg-slate-200 outline-none border-0 rounded-md p-2 min-w-32"
            value={content.text}
            onChange={(e) => {
              changeTableBody(row, col, e.currentTarget.value);
            }}
          ></textarea>
        </td>
      ) : (
        <td
          className={clsx(
            "cursor-pointer p-4 bg-slate-200 rounded-md whitespace-pre min-w-32",
            isActive && "animate-flip-in"
          )}
          onClick={() => {
            changeTableBodyShow(row, col);
            setIsActive(true);
          }}
          onAnimationEnd={() => {
            setIsActive(false);
          }}
        >
          {content.isDisplayed && content.text}
        </td>
      )}
    </>
  );
}
