import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CVSectionContent } from "../FirstCv/CVSectionContent";
import {
  certificateType,
  educationType,
  projectType,
  skillType,
  UserType,
  workExType,
} from "../../../../../types/UserType";
import { SecondCVSectionContent } from "../SecondCv/SecondCVSectionContent";
export type itemType =
  | "aboutMe"
  | "workEx"
  | "education"
  | "projects"
  | "certificate"
  | "skill";
export type dataType =
  | string
  | workExType[]
  | projectType[]
  | certificateType[]
  | educationType[]
  | undefined
  | skillType[]
  | UserType;
export const SortableItem = ({
  cvPos,
  isExport,
  id,
  type,
  data,
}: {
  cvPos: number;
  isExport: boolean;
  id: string;
  type: itemType;
  data: dataType;
}) => {
  const { attributes, listeners, transform, transition, setNodeRef } =
    useSortable({ id });
  const style: React.CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style}>
      {cvPos === 1 && (
        <CVSectionContent
          exportLoading={isExport}
          type={type}
          data={data}
          dragHandleProps={{ ...attributes, ...listeners }}
        />
      )}
      {cvPos === 2 && (
        <SecondCVSectionContent
          data={data}
          type={type}
          dragHandleProps={{ ...attributes, ...listeners }}
        />
      )}
      {cvPos === 3}
    </div>
  );
};
