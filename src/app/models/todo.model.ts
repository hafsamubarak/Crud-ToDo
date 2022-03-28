import { User } from "./user.model";

export interface Todo{
  id?:string,
  title:string,
  date:string,
  status:boolean,
  priority:string,
  created:any,
  description?:string,
  email?:User|string
}
