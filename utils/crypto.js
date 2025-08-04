import crypto from "crypto";

export const generateToken = (id, name, email) => {
  const data = `${id}-${name}-${email}`;
  const token = crypto
    .createHmac("sha256", process.env.HMAC_SECRET)
    .update(data)
    .digest("hex");
  return `${token}.${id}`;
};

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};
