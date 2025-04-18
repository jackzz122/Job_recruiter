import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
export const ListOfRequirement = ({
  listOfRequire,
}: {
  listOfRequire?: { value: string }[];
}) => {
  return (
    <Stack direction="row" spacing={1} marginBlock={1}>
      {listOfRequire?.map((require, index) => {
        return <Chip key={index} label={require.value} />;
      })}
    </Stack>
  );
};
