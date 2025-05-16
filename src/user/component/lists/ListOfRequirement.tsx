import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { colorButtonOrange } from "../../../themeContext";
export const ListOfRequirement = ({
  listOfRequire,
}: {
  listOfRequire?: { value: string }[];
}) => {
  return (
    <Stack direction="row" spacing={1} marginBlock={1}>
      {listOfRequire?.map((require, index) => {
        return (
          <Chip
            sx={{ color: "white", bgcolor: colorButtonOrange }}
            key={index}
            label={require.value}
          />
        );
      })}
    </Stack>
  );
};
