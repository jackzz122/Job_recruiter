import Typography from "@mui/material/Typography";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 140 },
  { field: "employee_name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "role", headerName: "Role join in", width: 130 },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    type: "singleSelect",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
  },
];

const rows = [
  {
    id: 1,
    employee_name: "Snow",
    email: "Jon@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
  {
    id: 2,
    employee_name: "Lannister",
    email: "Cersei@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-10",
    status: "rejected",
  },
  {
    id: 3,
    employee_name: "Lannister",
    email: "Jaime@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
  {
    id: 4,
    employee_name: "Stark",
    email: "Arya@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
  {
    id: 5,
    employee_name: "Targaryen",
    email: "Daenerys@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
  {
    id: 6,
    employee_name: "Melisandre",
    email: "Luong@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
  {
    id: 7,
    employee_name: "Clifford",
    email: "Ferrara@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
  {
    id: 8,
    employee_name: "Frances",
    email: "Rossini@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
  {
    id: 9,
    employee_name: "Roxie",
    email: "Harvey@gmail.com",
    role: "Frehser fullstack",
    date: "2024-01-12",
    status: "rejected",
  },
];
export const List_employ = () => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Employees waiting list
      </Typography>
      <br />
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Paper>
    </>
  );
};
