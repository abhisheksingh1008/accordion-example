import Gender from "../types/gender.type";

export default interface Celebrity {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  email: string;
  picture: string;
  country: string;
  description: string;
}
