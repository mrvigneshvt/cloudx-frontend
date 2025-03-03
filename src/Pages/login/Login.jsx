import React, { useState } from "react";
import OuterNavbar from "../../components/OuterNavbar/OuterNavbar";
import PhoneInput from "react-phone-input-2";
import "./Login.css";
import "react-phone-input-2/lib/style.css";
import { config } from "../../../config";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const navigate = useNavigate();

  console.log(
    config.apiPoint.whatsAuth.otp,
    "////",
    config.apiPoint.whatsAuth.otpVerify,
  );
  const [phone, setPhone] = useState(""); // To store the phone number
  const [otp, setOtp] = useState(""); // To store the OTP
  const [otpSent, setOtpSent] = useState(false); // To toggle OTP input visibility
  const [isLoading, setIsLoading] = useState(false); // To manage API loading state
  const [isauthenticated, setIsAuthenicated] = useState(false);

  // API call to request OTP
  const requestOtp = async (e) => {
    setIsLoading(true); // Show loading state
    try {
      console.log(phone);
      const response = await fetch(config.apiPoint.whatsAuth.otp, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({ phone }), // Send the phone number as JSON
      });

      console.log(response, "ress");

      //const data = await response.json();
      if (response.ok) {
        setOtpSent(true); // Show OTP input box
      } else if (response.status == 404) {
        alert("Failed to send OTP. OTP API Down Try After SomeTime");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // API call to verify OTP
  const verifyOtp = async () => {
    setIsLoading(true); // Show loading state
    try {
      const response = await fetch(config.apiPoint.whatsAuth.otpVerify, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ number: phone, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenicated(true);
        setTimeout(() => {
          navigate("/welcome");
        }, 2000);
        // Proceed to the next step, e.g., redirecting to a dashboard
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpSent) {
      // If OTP is already sent, verify the OTP
      await verifyOtp();
    } else {
      // Otherwise, request the OTP
      await requestOtp(e.target.value);
    }
  };
  if (isauthenticated) {
    return <Loader />;
  }

  return (
    <>
      {<OuterNavbar inLogin={true} />}
      <div className="container">
        <div className="outer-box">
          <div className="form-box">
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="phone">WhatsApp Number</label>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={setPhone} // Update phone state
                  inputStyle={{ width: "100%" }}
                  placeholder="Enter WhatsApp Number"
                  id="phone"
                />
                {otpSent && (
                  <input
                    placeholder="Enter The OTP"
                    className="otp-verify"
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} // Update OTP state
                  />
                )}
                <button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Loading..." // Show loading state
                    : otpSent
                    ? "Verify OTP" // Button text for verifying OTP
                    : "Get OTP"}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
