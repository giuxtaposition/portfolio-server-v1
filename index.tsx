const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

const {
  MY_PORT,
  NODEMAILER_SERVICE,
  NODEMAILER_USER,
  NODEMAILER_PASSWORD,
} = require("./config.tsx");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello!");
});

app.post("/portfolio/contact", (request, response) => {
  const body = request.body;
  const transporter = nodemailer.createTransport({
    service: NODEMAILER_SERVICE,
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASSWORD,
    },
  });
  const mailOptions = {
    from: body.email,
    to: "yg97.cs@gmail.com",
    subject: `Message  from ${body.name}, email: ${body.email}, subject: ${body.subject}`,
    text: body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      response.send("error");
    } else {
      console.log("Email sent: ", info.response);
      response.send("success");
    }
  });
});

const PORT = process.env.PORT || MY_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
