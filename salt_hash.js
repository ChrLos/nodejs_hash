import { createHash, randomBytes } from "crypto";
import PromptSync from "prompt-sync";
export const prompt = PromptSync();

function passwordHashing(repeat, length) {
  let password = prompt("What is your password?: ");
  const randomSalt = randomBytes(length).toString("hex");
  const predeterminedSalt = "";

  let salt = predeterminedSalt === "" ? randomSalt : predeterminedSalt;
  console.log(`Your salt: ${salt}`);

  console.time("hash");

  for (let i = 0; i < 1 << repeat; i++) {
    password = createHash("sha3-512")
      .update(password)
      .update(createHash("sha3-512").update(salt, "utf8").digest("hex"))
      .digest("hex");

    password = createHash("sha512-256WithRSAEncryption")
      .update(password)
      .update(
        createHash("sha512-256WithRSAEncryption")
          .update(salt, "utf8")
          .digest("hex")
      )
      .digest("hex");

    password = createHash("RSA-SHA3-512")
      .update(password)
      .update(createHash("RSA-SHA3-512").update(salt, "utf8").digest("hex"))
      .digest("hex");
  }

  password = salt + "+" + password;
  console.timeEnd("hash");

  return password;
}

const saltedPass = passwordHashing(18, 10);
console.log(saltedPass);
