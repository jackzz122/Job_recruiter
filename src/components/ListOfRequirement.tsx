import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
export const ListOfRequirement = ({
  listOfRequire,
}: {
  listOfRequire: string[];
}) => {
  return (
    <Stack direction="row" spacing={1} marginBlock={2}>
      {listOfRequire.map((require) => {
        return <Chip key={require} label={require} />;
      })}
    </Stack>
  );
};
