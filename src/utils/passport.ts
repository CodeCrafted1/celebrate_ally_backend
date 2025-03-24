import bcrypt from "bcrypt"

const getMatchPassword = async (password:string, hashedPassword:string) => (
  await bcrypt.compare(password, hashedPassword)
)

const hashPassword = async (password:string) => { 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export {
  getMatchPassword,
  hashPassword
}