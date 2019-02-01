export class messageReturn {

    constructor(
        public res: any,
        public message: string,
        public code: number = 200
      ) {  
        
      }
}
