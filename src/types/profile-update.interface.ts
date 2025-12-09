export interface IProfileUpdatePayload {
  name?: string;
  bio?: string;
  age?: number | string;
  gender?: string;
  travelStyle?: string;
  city?: string;
  country?: string;
  interests?: string[] | string;
  languages?: string[] | string;
}
