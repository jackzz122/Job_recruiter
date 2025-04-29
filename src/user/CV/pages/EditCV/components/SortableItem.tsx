import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CVSectionContent } from "./CVSectionContent";
import {
  certificateType,
  educationType,
  projectType,
  UserType,
  workExType,
} from "../../../../../types/UserType";

export const SortableItem = ({
  id,
  type,
  data,
}: {
  id: string;
  type: string;
  data:
    | string
    | workExType[]
    | projectType[]
    | certificateType[]
    | educationType[]
    | undefined
    | UserType;
}) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });
  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <>
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <CVSectionContent type={type} data={data} />
      </div>
    </>
  );
};
