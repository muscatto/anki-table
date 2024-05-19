interface Props {
  id: number;
  text: string;
  isEditing: boolean;
  headType: "col" | "row";
  handleChangeHead: (id: number, text: string, headType: "col" | "row") => void;
}

export default function TableHeadCard({
  id,
  text,
  isEditing,
  headType,
  handleChangeHead,
}: Props) {
  return (
    <>
      {isEditing ? (
        <textarea
          className="bg-gray-200 outline-none border-0 rounded-md p-2 min-w-32"
          value={text}
          onChange={(e) => {
            handleChangeHead(id, e.currentTarget.value, headType);
          }}
        ></textarea>
      ) : (
        <div className="bg-gray-200 p-4 rounded-md whitespace-pre min-w-32 font-semibold">
          {text}
        </div>
      )}
    </>
  );
}
