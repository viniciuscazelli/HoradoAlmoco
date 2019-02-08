import { Time } from '@angular/common';
import { user } from './user';

export class Horary {

    constructor(
        public hour: number,
        public minutes: number,
        public reservations: user []
      ) {  
        
      }
}

export class Day {

    constructor(
    public day: Date,
    public horary: Horary []
    ) {  
    
    }
}
export class ReserveDay{
    constructor(
    public day: Date,
    public hour: number,
    public minutes: number
    ) {  
    
    }
}
