export module utilCase {

    export function textValidate(text: string, regex : string){

        var patt = new RegExp(regex,"g");
        var myArray = text.match(patt);

       // console.log(myArray);
        return myArray.length == text.length;
    }

}