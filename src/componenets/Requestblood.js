import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import { Form, Col } from "react-bootstrap";
import { isAuthenticated } from "../Network";

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
  const [formData, updateFormData] = useState({
    bloodbank: "",
    city: "",
    bloodtype: "",
    amount: 0,
    date: "",
    email: isAuthenticated().email,
  });

  useEffect(() => {
    axios.get("http://3.239.66.148:5000/getCities").then((response) => {
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

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const onSelectCity = (option) => {
    const tempBloodBanks = response
      .filter((item) => item.city === option.label)
      .map((item) => item.name);
    setBloodBanks(tempBloodBanks);
    updateFormData({ ...formData, city: option.label });
  };

  const onSelectBloodBank = (option) => {
    updateFormData({ ...formData, bloodbank: option.label });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      .post("http://3.239.66.148:5000/updateSlotBooking", formData)
      .then((response) => {
        console.log(response);
        if (response.data) {
          alert(
            "Request sent successfully for " +
              formData.city +
              " in " +
              formData.bloodbank +
              "for " +
              formData.amount
          );
        } else {
          alert("Request failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Request Blood</h1>
      {cities.length < 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <Col>
              <div style={styles.dropdownGroup}>
                <Dropdown
                  options={cities}
                  onChange={onSelectCity}
                  placeholder="Select city"
                />
              </div>
            </Col>
            {bloodBanks && (
              <Col>
                <div style={styles.dropdownGroup}>
                  <Dropdown
                    options={bloodBanks}
                    onChange={onSelectBloodBank}
                    placeholder="Select blood bank"
                    name="bloodbank"
                  />
                </div>
              </Col>
            )}
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Amount</label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="amount"
                  onChange={handleChange}
                  value={formData.amount}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-4">
                <Form.Group controlId="date">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    placeholder="Date"
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                Choose your blood type
              </label>
              <div className="col-sm-4">
                <select
                  name="bloodtype"
                  className="form-select"
                  onChange={handleChange}
                  value={formData.bloodtype}
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
            <button
              type="submit"
              className="btn btn-primary"
              value="requestblood"
            >
              Submit to Request blood
            </button>
          </form>
        </>
      )}
    </div>
  );
}
export default Requestblood;
