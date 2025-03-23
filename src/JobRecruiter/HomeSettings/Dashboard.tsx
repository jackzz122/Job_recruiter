import { PieChart } from "@mui/x-charts/PieChart";
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
import Chip from "@mui/material/Chip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ContainerBox } from "../../components/ContainerRecruiter/ContainerBox";
type setting_type = {
  name: string;
  icons: React.ReactNode;
  amount: number;
  color: string;
};

const list_settings_dashboard: setting_type[] = [
  {
    name: "Total Page Views",
    icons: <RemoveRedEyeIcon fontSize="large" />,
    amount: 4.462,
    color: "blue",
  },
  {
    name: "Employees Waiting",
    icons: <PeopleAltIcon fontSize="large" />,
    amount: 300,
    color: "yellow",
  },
  {
    name: "Employees Application",
    icons: <FolderSharedIcon fontSize="large" />,
    amount: 20,
    color: "#5CFF5C",
  },
  {
    name: "Recruiter Posting",
    icons: <WorkIcon fontSize="large" />,
    amount: 10,
    color: "red",
  },
];
const GetListDashboard = () => {
  return list_settings_dashboard.map((setting, index) => {
    return (
      <Grid2 key={index} size={3}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="0.9rem">{setting.name}</Typography>
              <Chip
                size="small"
                sx={{ backgroundColor: setting.color, color: "white" }}
                label="+4 this week"
              />
            </Stack>
            <Stack
              sx={{ marginTop: "1rem" }}
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Typography
                fontWeight="bold"
                variant="h5"
                sx={{ marginTop: "1rem" }}
              >
                {setting.amount}
              </Typography>
              <Typography sx={{ color: "#5CFF5C" }}>
                <ArrowUpwardIcon /> 12%
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    );
  });
};
export const Dashboard = () => {
  return (
    <ContainerBox>
      <Grid2 container spacing={3}>
        <GetListDashboard />
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
    </ContainerBox>
  );
};
