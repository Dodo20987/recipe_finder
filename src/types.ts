export interface MealItem {
  image: string;
  ID: string; 
  name: string;
  area: string;
}

export interface User {
  name : string;
  password : string;
  email?: string;
}
export interface loginRequest {
  name: string;
  password : string;
}
export interface Favourite {
  recipeID : number;
  userID : number;
  name : string;
}

export type RootStackParamList = {
  Home: undefined,
  PasswordInput: {name : string, email : string | undefined},
  Login: undefined,
  Signup: undefined,
  Recipe: {ID : string}
}