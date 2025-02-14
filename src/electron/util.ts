export function IsDev(): boolean {
  return process.env.NODE_ENV === 'development';
}