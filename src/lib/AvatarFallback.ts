export const AvatarFallbackFunction = (name: string | null | undefined) => {
  if (!name) {
    return null;
  }

  return name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();
};
