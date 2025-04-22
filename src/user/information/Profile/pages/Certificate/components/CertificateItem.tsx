import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ItemList } from "../../../components/ItemList";
export const CertificateItem = ({
  name,
  organization,
  month,
  year,
}: {
  name: string;
  organization: string;
  month: number;
  year: number;
}) => {
  return (
    <>
      <ItemList>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Certificate: <strong>{name}</strong>
          </Typography>
          <Typography color="text.secondary">
            Organization: {organization}
          </Typography>
          <Typography color="text.secondary">
            {month}/{year}
          </Typography>
        </Box>
      </ItemList>
    </>
  );
};
