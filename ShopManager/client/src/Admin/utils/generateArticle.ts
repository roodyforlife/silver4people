export const generateArticle = (length: number): string => {
    const characters = '0123456789';
    let result = "";
  
    for (let i = 0; i < length; i++) {
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      result += randomChar;
    }
  
    return result;
}