const express = require("express");
const router = express.Router();
const Video = require("../models/videoModel");
const CallbackRequest = require("../models/CallBackModel");
const nodemailer = require("nodemailer");

// Handle video submission and analysis

// router.get("video",async(req,res)=>{})
// router.post("/submitVideo", async (req, res) => {
//   // Fetch data from request body
//   const { title, url, likes, comments, views } = req.body;

//   // Calculate earnings (replace this with your specific formula)
//   const calculatedEarnings =
//      views + 10 * comments + 5 * likes;

//   try {
//     const newVideo = new Video({
//       title,
//       url,
//       likes,
//       comments,
//       views,
//       calculatedEarnings,
//     });

//     // Save video data to MongoDB
//     await newVideo.save();

//     res.status(200).json({ message: "Video analysis completed successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Error analyzing video" });
//   }
// });

// Handle callback requests
router.post("/requestCallback", async (req, res) => {
  // Fetch data from request body
  const { name, contactNumber } = req.body;

  try {
    const newCallbackRequest = new CallbackRequest({
      name,
      contactNumber,
    });

    // Save callback request data to MongoDB
    await newCallbackRequest.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOptions = {
      from: "yash.20465@knit.ac.in",
      to: "ravi@anchors.in",
      subject: "New Callback Request",
      html: `
        <p>Name: ${name}</p>
        <p>Contact Number: ${contactNumber}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Callback request submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error submitting callback request" });
  }
});

module.exports = router;
