import { PieChart } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid2 from "@mui/material/Grid2";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import Stack from "@mui/material/Stack";
import WorkIcon from "@mui/icons-material/Work";
import { LineChart } from "@mui/x-charts/LineChart";
type setting_type = {
  name: string;
  icons: React.ReactNode;
  amount: number;
};

const list_settings_dashboard: setting_type[] = [
  {
    name: "Total Page Views",
    icons: <RemoveRedEyeIcon fontSize="large" />,
    amount: 4.462,
  },
  {
    name: "Employees Waiting",
    icons: <PeopleAltIcon fontSize="large" />,
    amount: 300,
  },
  {
    name: "Employees Application",
    icons: <FolderSharedIcon fontSize="large" />,
    amount: 20,
  },
  {
    name: "Recruiter Posting",
    icons: <WorkIcon fontSize="large" />,
    amount: 10,
  },
];

export const Dashboard = () => {
  return (
    <>
      <Typography variant="h5" marginBottom={2}>
        Dashboard
      </Typography>
      <Grid2 container spacing={3}>
        {list_settings_dashboard.map((setting, index) => {
          return (
            <Grid2 key={index} size={3}>
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {setting.icons}
                  <Box>
                    <Typography sx={{ color: "gray" }}>
                      {setting.name}
                    </Typography>
                    <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                      {setting.amount}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
      <Stack
        direction="row"
        alignItems="center"
        marginTop={4}
        spacing={2}
        className="bar_chart"
      >
        <LineChart
          sx={{ border: "1px solid #D3D3D3", borderRadius: "1rem" }}
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={700}
          height={400}
        />
        <PieChart
          sx={{ border: "1px solid #D3D3D3", borderRadius: "1rem" }}
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={700}
          height={400}
        />
      </Stack>
    </>
  );
};
