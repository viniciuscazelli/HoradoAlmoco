export class options {

    constructor(
        public title: string,
        public options: optionsItens[]
      ) {  
        
      }
}

export class optionsItens {

    constructor(
        public name: string,
        public routerLink: string,
        public options: optionsItens[] ,
        public activeRouterLink: boolean ,
        public showOnlyAdmin : boolean
      ) {  
        
      }
}
