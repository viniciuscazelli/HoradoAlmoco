import { user } from "./user";

export class Group {

    constructor(
        name: string,
        userAdmin: user,
        users: user[],
        messagens: Message[]
      ) {  
        
      }
}

export class Message {

    constructor(
        user: user,
        date: Date,
        mensagem : string
      ) {  
        
      }
}