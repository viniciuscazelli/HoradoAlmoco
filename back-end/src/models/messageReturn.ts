export class messageReturn<T> {

    constructor(
        public res: T,
        public message: string,
        public code: number = 200
      ) {  
        
      }
}
