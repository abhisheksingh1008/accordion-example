export function calculateAge(dob: string): number {
  const date = new Date(dob);
  var diff_ms = Date.now() - date.getTime();
  var age_date = new Date(diff_ms);

  return Math.abs(age_date.getUTCFullYear() - 1970);
}
