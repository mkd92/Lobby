import * as React from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";

import transactionStore from "../../app/transactionStore";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Transactions() {
  const [data, setData] = useState({});
  const params = useParams();
  const transactionData = transactionStore((store) => store.transactionData);
  const reloadData = transactionStore((store) => store.reloadData);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  useEffect(() => {
    reloadData(params.prop_id, params.unit_id);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(transactionData);
    return () => {};
  }, [transactionData]);
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    console.log(e.target.id, e.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Details</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
          <TableRow
            key="transactionForm"
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TableCell component="th" scope="row">
                <DesktopDatePicker
                  id="transaction_date"
                  value={data.transaction_date}
                  onChange={(newDate) => {
                    setData({ ...data, transaction_date: newDate });
                    console.log(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  id="detail"
                  placeholder="Details"
                  onChange={onChangeHandler}
                />
              </TableCell>
              <TableCell align="right">
                <Input
                  id="amount"
                  onChange={onChangeHandler}
                  placeholder="Amount"
                />
              </TableCell>
              <TableCell align="right">
                <Input placeholder="Balance" />
              </TableCell>
              <TableCell align="right"></TableCell>
            </LocalizationProvider>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="contained">Add</Button>
    </TableContainer>
  );
}
