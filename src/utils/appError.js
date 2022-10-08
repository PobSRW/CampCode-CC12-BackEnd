module.exports = class AppError extends Error {
	constructor(message, statusCode) {
		super(message); // เรียกตัว constructorError ใน Class ต้นแบบ
		this.statusCode = statusCode;
	}
};
/*
class Error {
  constructor(m) {
    this.message = m;
  }
}

const newError = new Error("Unauthorize")
{
  message : "Unauthorize"
}

const newCustomError = new AppError("Unauthorize",401)

{
   message : "Unauthorize".
   statusCode : 401
}
*/
