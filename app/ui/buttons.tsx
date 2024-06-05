import {
  EyeSlashIcon,
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
  TableCellsIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export function EditButton({
  isEditing,
  changeEditMode,
}: {
  isEditing: boolean;
  changeEditMode: () => void;
}) {
  return (
    <button
      onClick={changeEditMode}
      className="text-white bg-green-500 rounded-md p-2 active:opacity-70"
    >
      <PencilSquareIcon className="h-6 w-6 inline-block" />
      {isEditing ? "保存する" : "編集する"}
    </button>
  );
}

export function AddButton({ handleAddClick }: { handleAddClick: () => void }) {
  return (
    <PlusIcon
      className="h-10 w-10 text-white cursor-pointer bg-gray-300 rounded-md p-2 m-3 active:opacity-70"
      onClick={handleAddClick}
    />
  );
}

export function DeleteButton({
  handleDelClick,
}: {
  handleDelClick: () => void;
}) {
  return (
    <MinusIcon
      className="h-10 w-10 text-white cursor-pointer bg-gray-300 rounded-md p-2 m-3 active:opacity-70"
      onClick={handleDelClick}
    />
  );
}

export function HeadStatusButton({
  onChangeHeadClick,
  text,
}: {
  onChangeHeadClick: () => void;
  text: string;
}) {
  return (
    <button
      onClick={onChangeHeadClick}
      className="text-white bg-black rounded-md p-2 active:opacity-70"
    >
      <TableCellsIcon className="h-6 w-6 inline-block" />
      {text}
    </button>
  );
}

export function ResetButton({ resetTable }: { resetTable: () => void }) {
  return (
    <button
      onClick={resetTable}
      className="text-white bg-red-500 rounded-md p-2 active:opacity-70"
    >
      <TrashIcon className="h-6 w-6 inline-block" />
      リセット
    </button>
  );
}

export function HideButton({ onHideClick }: { onHideClick: () => void }) {
  return (
    <button
      onClick={onHideClick}
      className="text-white bg-black rounded-md p-2 active:opacity-70"
    >
      <EyeSlashIcon className="h-6 w-6 inline-block" />
      全て隠す
    </button>
  );
}
