export const base64ASCII = (base64: string) => {
  const buff = new Buffer(base64, "base64");
  return buff.toString("ascii");
};
