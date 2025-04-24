import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ItemList } from "../../../components/ItemList";
export const CertificateItem = ({
  _id,
  name,
  organization,
  month,
  year,
  handleEdit,
}: {
  _id: string;
  name: string;
  organization: string;
  month: number;
  year: number;
  handleEdit: (id: string) => void;
}) => {
  return (
    <>
      <ItemList id={_id} onEdit={handleEdit} type="certificate">
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
