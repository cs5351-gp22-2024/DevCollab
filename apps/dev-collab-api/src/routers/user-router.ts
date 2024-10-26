import express from "express";
import { VCode } from "../function/verification-code";
import { UserAccount } from "../function/user-account";

export const userRouter = express.Router();

userRouter.get("/api/account/v-code", async (req, res) => {
  const email: string = req.query.email as string;
  if (!VCode.isValidEmail(email)) {
    res.status(400).send({ result: "UNSUCCESS", error: "INVALID_EMAIL" });
    return;
  }
  VCode.createVcode(email);
  res.send({ result: "SUCCESS", email: email });
  return;
});

userRouter.post("/api/account/v-code", async (req, res) => {
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

userRouter.post("/api/account/create", async (req, res) => {
  const { email, code, password, invitation } = req.body; // Expecting email and code in the body

  if (!email || !VCode.isValidEmail(email) || !code || !password) {
    res.status(400).send({ result: "UNSUCCESS", error: "INVALID_INPUT" });
    return;
  }

  try {
    const result = await UserAccount.createAccount(
      email,
      password,
      code,
      invitation
    );
    if (result.result == "SUCCESS") {
      console.log(result)
      res.status(200).send(result);
    } else {
      res.status(400).send(result);
    }
  } catch (error) {
    res.status(500).send({ result: "UNSUCCESS", error: "FAILED_TO_CREATE" });
    return;
  }
});

userRouter.post("/api/account/login/password", async (req, res) => {
  const { email, password } = req.body; // Expecting email and code in the body

  if (!email || !VCode.isValidEmail(email) || !password) {
    res.status(400).send({ result: "UNSUCCESS", error: "INVALID_INPUT" });
    return;
  }

  try {
    // Fetch the user by email
    const user = await UserAccount.getRecord(email, password);

    // Check if user exists
    if (!user) {
      res.status(400).send({ result: "UNSUCCESS", error: "USER_NOT_FOUND" });
      return;
    }

    const token = await UserAccount.generateJWT(user);

    // Return success response with the token
    res.status(200).send({ result: "SUCCESS", token: token });
  } catch (error) {
    res.status(500).send({ result: "UNSUCCESS", error: "LOGIN_FAILED" });
  }
});

userRouter.post("/api/account/login/token", async (req, res) => {
  const { token } = req.body; // Expecting email and code in the body

  if (!token) {
    res.status(400).send({ result: "UNSUCCESS", error: "INVALID_INPUT" });
    return;
  }

  try {
    // decode JWT
    const decoded = await UserAccount.checkJWT(token);

    // Check if user exists
    if (decoded.result == "SUCCESS") {
      res.status(200).send(decoded);
      return;
    } else {
      res.status(400).send(decoded);
      return;
    }
  } catch (error) {
    res.status(500).send({ result: "UNSUCCESS", error: "LOGIN_FAILED" });
  }
});
