import Gender from "../types/gender.type";

export default interface Celebrity {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: Gender;
  email: string;
  picture: string;
  country: string;
  description: string;
}
