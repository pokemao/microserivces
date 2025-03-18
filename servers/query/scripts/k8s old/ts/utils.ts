const reg = /gen(.*)YML.ts$/i;

export const getYMLFileOutputName = (str: string) => {
  return str.match(reg)?.[1].toLowerCase();
}
