import express from "express";
import { UserGroup } from "../function/user-group";

export const groupRouter = express.Router();

groupRouter.get("/api/:userid/group", async (req, res) => {
  const userid = parseInt(req.params.userid);
  const jwt_token = req.headers["authorization"];
});

groupRouter.post("/api/:userid/group/create", async (req, res) => {
  try {
    const userid = parseInt(req.params.userid).toString();
    const jwt_token = req.headers["authorization"];
    let { group_name } = req.body;

    if (group_name === null) {
      group_name = "";
    }
    const group_data = await UserGroup.createGroup(group_name, userid);

    if (group_data.result === "SUCCESS") {
      //res.status(201).send({ result: "SUCCESS", group_id: data.group_id });
      const member_data = await UserGroup.joinGroup(
        group_data.group_id!.toString(),
        userid,
        "ADMIN"
      );
      if (group_data.result === "SUCCESS") {
        res.status(201).send({ result: "SUCCESS", member: member_data.member });
        return;
      } else {
        res.status(400).send({ result: "UNSUCCESS", error: member_data.error });
        return;
      }
      return;
    } else {
      res.status(400).send({ result: "UNSUCCESS", error: group_data.error });
      return;
    }
  } catch (e) {
    console.error(e); // Log the error for debugging
    res
      .status(500)
      .send({ result: "UNSUCCESS", error: "FAILED_TO_CREATE_GROUP" });
    return;
  }
});

groupRouter.post("/api/:userid/group/delete", async (req, res) => {
  const userid = parseInt(req.params.userid);
  const jwt_token = req.headers["authorization"];
});

groupRouter.post("/api/:userid/group/join", async (req, res) => {
  const userid = parseInt(req.params.userid);
  const jwt_token = req.headers["authorization"];
});

groupRouter.post("/api/:userid/group/update", async (req, res) => {
  const userid = parseInt(req.params.userid);
  const jwt_token = req.headers["authorization"];
});
