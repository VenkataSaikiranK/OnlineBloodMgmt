import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import { Form } from "react-bootstrap";

const styles = {
  dropdownGroup: {
    width: "200px",
    marginTop: "10px",
    backgroundColor: "#00acff",
    padding: "5px",
    cursor: "pointer",
    color: "white",
    borderRadius: "5px",
  },
};

function Requestblood() {
  const [cities, setCities] = useState([]);
  const [response, setResponse] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [formData, updateFormData] = useState({ amount: "" });

  function updateamount(event) {
    updateFormData({ ...formData, amount: event.target.value });
  }
  useEffect(() => {
    axios.get("http://localhost:5000/getCities").then((response) => {
      if (response.data) {
        setResponse(response.data);
        const tempCities = [
          ...new Map(
            response.data.map((item) => [item["city"], item])
          ).values(),
        ].map((item) => item.city);
        setCities(tempCities);
      }
    });
  }, []);

  const onSelectCity = (option) => {
    const tempBloodBanks = response
      .filter((item) => item.city === option.label)
      .map((item) => item.name);
    setBloodBanks(tempBloodBanks);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:5000/updateSlotBooking", formData)
      .then((response) => {
        console.log(response);
        if (response.data) {
          alert("Request sent successfully");
        } else {
          alert("Request failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function updateBlood(event) {
    updateFormData({ ...formData, blood: event.target.value });
  }

  return (
    <div>
      <h1>Request Blood</h1>
      {cities.length < 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={styles.dropdownGroup}>
            <Dropdown
              options={cities}
              onChange={onSelectCity}
              placeholder="Select city"
            />
          </div>
          {bloodBanks && (
            <div style={styles.dropdownGroup}>
              <Dropdown
                options={bloodBanks}
                // onChange={onSelectCity}
                placeholder="Select blood bank"
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Amount</label>
              <div class="col-sm-4">
                <input
                  type="text"
                  class="form-control"
                  name="amount"
                  onChange={updateamount}
                  value={formData.amount}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <Form.Group controlId="date">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" name="date" placeholder="Date" />
                </Form.Group>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">
                Choose your blood type
              </label>
              <div class="col-sm-4">
                <select
                  name="Blood_type"
                  class="form-select"
                  onChange={updateBlood}
                  value={formData.blood}
                  id="bt"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </form>
          <button
            type="submit"
            className="btn btn-primary"
            value="requestblood"
          >
            Submit to Request blood
          </button>
        </>
      )}
    </div>
  );
}
export default Requestblood;
