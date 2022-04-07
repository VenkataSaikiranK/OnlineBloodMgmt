import axios from "axios";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format, formatISO } from "date-fns";
import Paper from "@mui/material/Paper";
import { isAuthenticated } from "../Network";
import { width } from "@mui/system";

function Refund() {
  var email = isAuthenticated().email;
  const [lists, setEvents] = useState([]);
  React.useEffect(() => {
    const getBookings = async () => {
      var query = `select * from slotbooking where email ='` + email + "'";
      axios
        .post("http://75.101.147.69:3000/insert", { query: query })
        .then((result) => result.data)
        .then((body) => setEvents(body))
        .then(() => console.log(lists));
    };
    getBookings();
  }, []);

  const handleCancel = (event) => {
    axios
      .post("http://localhost:5000/updateSlotBooking", {
        email: email,
        operation: "REFUND",
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          alert("Request sent successfully");
        } else {
          alert("Request failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <br />
      <h5>Cancel blood bookings for the refund</h5>
      <TableContainer
        component={Paper}
        style={{ width: 800 + "px", marginLeft: 20 + "px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Blood Bank</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lists.map((list) => (
              <TableRow>
                <TableCell align="right">{list.city}</TableCell>
                <TableCell align="right">{list.bloodbank}</TableCell>
                <TableCell align="right">
                  {format(new Date(list.date), "yyyy-MM-dd")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <button
        type="submit"
        className="btn btn-primary"
        value="refundblood"
        onClick={handleCancel}
      >
        Cancel the above bookings
      </button>
    </div>
  );
}

export default Refund;
