export const jwtSecret = "myjwtsecret.@1425360";

export const RESPONSE = {
  
  SUCCESS: {
    CODE: 1101,
    MESSAGE: "Success",
  },
  ERROR: {
    CODE: 2202,
    MESSAGE: "Error",
  },
  USERNAME_OR_PASSWORD_IS_EMPTY: {
    CODE: 10010,
    MESSAGE: "Username or Password cannot be blank.",
  },
  USERNAME_MUST_BE_IDCARD: {
    CODE: 10011,
    MESSAGE: "Username must be Thai ID Card Number.",
  },
  USERNAME_PASSWORD_IS_INCORRECT: {
    CODE: 10012,
    MESSAGE: "Username or Password is incorrect.",
  },
  INVALID_INPUT: {
    CODE: 10013,
    MESSAGE: "Incoming inputs are invalid.",
  },
  MUST_BE_IN_THAI: {
    CODE: 10014,
    MESSAGE: " must be in Thai language",
  },
  PASSWORD_GREATER_THAN_8: {
    CODE: 10015,
    MESSAGE: "Password must be greater than 8 characters",
  },
  PASSWORD_MISSMATCH: {
    CODE: 10016,
    MESSAGE: "Password missed match",
  },
  UNAUTHORIZED: {
    CODE: 403,
    MESSAGE: "Not Authorized",
  }
};
