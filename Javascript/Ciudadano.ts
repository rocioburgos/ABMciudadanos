/// <reference path="./persona.ts" />

namespace Entidades{

    export class Ciudadano extends Entidades.Persona{

        protected DNI:number;
        protected pais:string;

        public constructor(nombre:string, apellido:string, edad:number, dni:number,pais:string){
            super(nombre,apellido,edad);
            this.DNI=dni;
            this.pais=pais;
        }


        public  personaToJson():JSON{

            let persona:string=super.personaToString();
            
            return JSON.parse('{'+persona+'"pais":"'+this.pais+'","dni":'+this.DNI+'}');
          
        }
    }
}