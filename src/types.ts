export interface MealItem {
  image: string;
  ID: string; 
  name: string;
  area: string;
}

export interface User {
  username : string;
  password : string;
  email?: string;
}
export interface UserUpdateRequest {
  username? : string;
  password? : string;
  email? : string
}
export interface loginRequest {
  name: string;
  password : string;
}
export interface Favourites {
  recipeID : number;
  userID : number;
  name? : string;
  image : string;
  tags : string;
  area : string;
  category : string;

}

export interface FavouriteRequest {
  recipeID : number;
  userID : number;
}

export type RootStackParamList = {
  Home: undefined,
  PasswordInput: {name : string, email : string | undefined},
  Login: undefined,
  Signup: undefined,
  Recipe: {ID : string}
}
