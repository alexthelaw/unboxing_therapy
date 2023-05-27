export function startAndEnd(str: string | undefined, gap: number) {
  const lngth = 30;
  const gapMin = 0;
  if (str && str.length > lngth) {
    return `${str.substr(gapMin, gap)}...${str.substr(str.length - gap, str.length)}`;
  }
  return str;
}

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const copy = async (text: string) => {
  await navigator.clipboard.writeText(text);
};
