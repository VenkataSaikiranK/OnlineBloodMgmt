import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Axios from "../axiosUrls";


function EmailForm() {
  const [formData, updateForm] = useState({
    msg: "",
  });
  const updateTextArea = (event) => {
    updateForm({ ...formData, msg: event.target.value });
  };

  const sendForm = () => {
    Axios
      .post("/publish", {
        body: formData.msg,
      })
      .then(function (response) {
        console.log(response);
        updateForm({ ...formData, msg: "message sent" });
        alert("message sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        style={{ maxWidth: "700px", margin: "0px auto" }}
      >
        <TextField
          id="msg"
          name="msg"
          label="custom message"
          multiline
          rows={4}
          value={formData.EventDes}
          onChange={updateTextArea}
        />
        <Stack direction="row" spacing={2}>
          <Button onClick={sendForm} variant="contained">
            send
          </Button>
        </Stack>
      </Box>
    </div>
  );
}

export default EmailForm;
