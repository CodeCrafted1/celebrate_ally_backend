import bcryptjs from "bcryptjs"
const getMatchPassword = async (password:string, hashedPassword:string) => (
  await bcryptjs.compare(password, hashedPassword)
)

const hashPassword = async (password:string) => { 
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
}

export {
  getMatchPassword,
  hashPassword
}