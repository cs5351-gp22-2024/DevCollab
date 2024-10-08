import express from "express";
import { VCode } from "../function/Verification-Code";

export const userRouter = express.Router();

userRouter.get("/api/v-code", async (req, res) => {
  const email: string = req.query.email as string;
  if (!VCode.isValidEmail(email)) {
    res.status(400).send({ result: "UNSUCCESS", error: "INVALID_EMAIL" });
    return;
  }
  VCode.createVcode(email);
  res.send({ result: "SUCCESS", email: email });
  return;
});

userRouter.post("/api/v-code", async (req, res) => {
  const { email, code } = req.body; // Expecting email and code in the body

  if (!email || !VCode.isValidEmail(email) || !code) {
    res.status(400).send({ result: "UNSUCCESS", error: "INVALID_INPUT" });
    return;
  }

  try {
    // Find the verification record by email
    const verification_record = await VCode.getRecord(email);

    if (!verification_record) {
      res
        .status(404)
        .send({ result: "UNSUCCESS", error: "VERIFICATION_NOT_FOUND" });
      return;
    }

    if (await VCode.checkVCode(verification_record, code)) {
      res.status(200).send({ result: "SUCCESS", email: email });
    } else {
      res.status(400).send({ result: "UNSUCCESS", error: "INVALID_CODE" });
    }
  } catch (error) {
    //console.error("Error verifying code:", error);
    res
      .status(500)
      .send({ result: "UNSUCCESS", error: "FAILED_TO_VERIFY_CODE" });
    return;
  }
});
