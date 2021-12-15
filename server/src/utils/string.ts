export const checkEmptyString = (word: string) => {
  word = encodeURI(word);
  return word.length <= 0 || word == "" || typeof word !== "string";
};

export const checkThaiLanguage = (word: string) => {
  return /[\w\^<,\"@\/\{\}\(\)\*\$%\?=>:\|;#]+/i.test(word);
};
