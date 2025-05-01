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
import { ThirdCvSectionContent } from "../ThirdCv/ThirdCvSectionContent";
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
  selectedColor,
  cvPos,
  isExport,
  id,
  type,
  data,
}: {
  selectedColor: { name: string; primary: string };
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
          selectedColor={selectedColor}
          data={data}
          type={type}
          dragHandleProps={{ ...attributes, ...listeners }}
        />
      )}
      {cvPos === 3 && (
        <ThirdCvSectionContent
          dragHandleProps={{ ...attributes, ...listeners }}
          selectedColor={selectedColor}
          data={data}
          type={type}
        />
      )}
    </div>
  );
};
