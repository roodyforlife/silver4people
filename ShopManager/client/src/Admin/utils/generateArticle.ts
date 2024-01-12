export const generateArticle = (prefix: string, length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = prefix;
  
    for (let i = 0; i < length; i++) {
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      result += randomChar;
    }
  
    return result;
}