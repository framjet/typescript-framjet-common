interface Options {
  prefix?: string;
  suffix?: string;
  characters?: string;
}

export function randomString(
  length: number,
  {
    prefix = '',
    suffix = '',
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  }: Options = {}
) {
  let result = prefix;
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${result}${suffix}`;
}
