namespace  Entidades{


   export  class Persona{
        protected nombre:string;
        protected apellido:string;
        protected edad:number;


        public constructor(nombre:string, apellido:string , edad:number){

            this.apellido=apellido;
            this.nombre=nombre;
            this.edad=edad;
        }

        protected personaToString():string {
            return ('"nombre":"'+this.nombre+'","apellido":"'+this.apellido+ '","edad":' + this.edad+',');
        }
    }
}