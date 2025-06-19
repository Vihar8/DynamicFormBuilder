import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import classes from "./Captcha.module.scss";
import InputBox from "../InputBox/InputBox";

const Captcha = ({ isValidCaptcha, setIsValidCaptcha, isGenerate }) => {
  const [captchaText, setCaptchaText] = useState(generateCaptcha());
  const [captchaImage, setCaptchaImage] = useState(textToDataURL(captchaText));
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    regenerateCaptcha();
  }, [isGenerate]);

  function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  function handleChange1(event) {
    const input = event.target.value;
    setUserInput(input.toUpperCase());
    if (input.toUpperCase() === captchaText) {
      setIsValidCaptcha(true);
    } else {
      setIsValidCaptcha(false);
    }
  }

  function regenerateCaptcha() {
    const newCaptchaText = generateCaptcha();
    setCaptchaText(newCaptchaText);
    setCaptchaImage(textToDataURL(newCaptchaText));
    setUserInput("");
    setIsValidCaptcha(false);
  }

  // Function to convert text to image URL
  function textToDataURL(text) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    // Increase canvas resolution
    canvas.width = 200; // Adjust width as per your requirement
    canvas.height = 100; // Adjust height as per your requirement

    // Set background color to white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random dots for background
    const dotCount = 100; // Increase number of dots
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2; // Increase dot size
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#000"; // Adjust dot color
      ctx.fill();
    }

    // Draw text
    ctx.font = "bold 32px Arial"; // Increase font size
    ctx.fillStyle = "black"; // Adjust text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Draw multiple lines
    const lineCount = 5; // Increase number of lines
    for (let i = 0; i < lineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = "black"; // Adjust line color
      ctx.lineWidth = 1; // Increase line thickness
      ctx.stroke();
    }
    // Enable antialiasing
    ctx.imageSmoothingEnabled = true;
    return canvas.toDataURL("image/png");
  }

  return (
    <Grid container item xs={12} spacing={1} mt={0}>
      <Grid item xs={4}>
        <img width={"100%"} src={captchaImage} alt="captcha" />
      </Grid>
      <Grid container item xs={8} spacing={1} alignItems="center">
        <Grid item xs={9} display="flex" flexDirection="column" mb={0}>
          <InputBox
            type="text"
            value={userInput}
            placeholder="Enter Captcha"
            onChange={handleChange1}
            variant="outlined"
            size="medium"
            inputProps={{ maxLength: 6 }}
          />
          {userInput.length === 6 && !isValidCaptcha && (
            <p className={`${classes.invalidText}`}>Invalid Captcha</p>
          )}
          {isValidCaptcha && (
            <p variant="body1" className={`${classes.validText}`}>
              Valid Captcha
            </p>
          )}
        </Grid>
        <Grid item xs={3}>
          {!isValidCaptcha && (
            <Typography
              className={`${classes.resetBtn}`}
              onClick={regenerateCaptcha}
              size="small"
            >
              Reset
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Captcha;
