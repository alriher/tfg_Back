import fs from "fs";

export class Utils {
  static buildMessage(res, message, code) {
    return res.status(code).send({ message, code});
  }

}