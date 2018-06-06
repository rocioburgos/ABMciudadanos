/// <reference path="./persona.ts" />
/// <reference path="./Ciudadano.ts" />

namespace Test{

   export class Manejadora{

        public static AgregarCiudadano():void{
           
            Test.Manejadora.AdministrarSpiner(true);
            //Tomo los valores del index
           var nombre:string=(<HTMLInputElement>document.getElementById('txtNombre')).value;
            var apellido:string=((<HTMLInputElement>document.getElementById('txtApellido')).value);
            var edad:number=parseInt((<HTMLInputElement>document.getElementById('txtEdad')).value);
            var dni:number=parseInt((<HTMLInputElement>document.getElementById('txtDni')).value);
            var pais:string=(<HTMLInputElement>document.getElementById("cboPais")).value;   

            var unCiudadano= new Entidades.Ciudadano(nombre,apellido,edad,dni,pais);

            let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

            xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
            xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
           
          
            if((<HTMLInputElement>document.getElementById("btn-success")).value=="Agregar"){
          
                xmlhttp.send("caso=agregar&cadenaJson="+JSON.stringify(unCiudadano.personaToJson()));

                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                       Test.Manejadora.AdministrarSpiner(false);
                      
                        let respuesta=JSON.parse(xmlhttp.responseText)
                        if(respuesta.TodoOK)
                        {
                          console.log("agregado correctamente");
                        }
                    }
                } 
                Test.Manejadora.LimpiarForm();
            
            }else{

                xmlhttp.send("caso=modificar&cadenaJson="+JSON.stringify(unCiudadano.personaToJson()));

                xmlhttp.onreadystatechange = function()
                {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                    {
                       Test.Manejadora.AdministrarSpiner(false);
                        let respuesta=JSON.parse(xmlhttp.responseText)
                        if(respuesta.TodoOK)
                        {
                          console.log("modificado correctamente");
                          Test.Manejadora.MostrarCiudadanos();
                        
                        }
                    }
                }
                Test.Manejadora.LimpiarForm();
            }
    }


    public static MostrarCiudadanos(){
       

        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

        xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
       
        xmlhttp.send("caso=mostrar");

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                let ciudaArray : any[] = JSON.parse(xmlhttp.responseText);
                (<HTMLSelectElement>document.getElementById("divTabla")).innerHTML = "<table><tr><td> Nombre </td> <td> Apellido </td> <td> Edad </td> <td> Pais </td><td>DNI</td></tr>";
                for(let i=0; i<ciudaArray.length; i++)
                {
                    let stringCiudadano:string="";
                    stringCiudadano="<tr><td>"+ciudaArray[i].nombre+" </td><td>"+ciudaArray[i].apellido+" </td><td>"+ciudaArray[i].edad+" </td><td>"+ ciudaArray[i].pais+"</td><td>"+ ciudaArray[i].dni  +"<input type='button' value='Modificar' onclick='Test.Manejadora.ModificarCiudadano("+JSON.stringify(ciudaArray[i])+")'></input></td><td><input type='button' value='Eliminar' onclick='Test.Manejadora.EliminarCiudadano("+JSON.stringify(ciudaArray[i])+")'></input></tr><br>";
                    (<HTMLSelectElement>document.getElementById("divTabla")).innerHTML += stringCiudadano;
                }
                (<HTMLSelectElement>document.getElementById("divTabla")).innerHTML += "</table>";
            }
        }
    }

    public static EliminarCiudadano(ciudadano:JSON){

           let ciudadanoEliminar:any=ciudadano;

        /*  alert(JSON.stringify(ciudadano));
         confirm("Seguro que va a eliminar a "+ciudadanoEliminar.nombre+" "+ciudadanoEliminar.apellido);*/
           let r = confirm("Desea eliminar al ciudadano? "+ciudadanoEliminar.nombre+" "+ciudadanoEliminar.apellido) ;
            if(r==true){    
                
                Test.Manejadora.AdministrarSpiner(true);
                
                let xmlhttp : XMLHttpRequest = new XMLHttpRequest();
                xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
                xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
                xmlhttp.send("caso=eliminar&cadenaJson="+JSON.stringify(ciudadano));
            
                
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {   
                Test.Manejadora.AdministrarSpiner(false);
                let respuesta=JSON.parse(xmlhttp.responseText)
                if(respuesta.TodoOK)
                {
                    Test.Manejadora.MostrarCiudadanos();
                }
            }
        
        }


            }else
            {
                alert("accion canceladaa");
            }
                
        
        
        }



    public static ModificarCiudadano(ciudadano:JSON){
       
        let ciudadanoModificar:any=ciudadano;
        (<HTMLInputElement>document.getElementById('txtNombre')).value=ciudadanoModificar.nombre;
        (<HTMLInputElement>document.getElementById('txtApellido')).value=ciudadanoModificar.apellido;
        ((<HTMLInputElement>document.getElementById('txtEdad')).value)=ciudadanoModificar.edad;
        ((<HTMLInputElement>document.getElementById('txtDni')).value)=ciudadanoModificar.dni;
        ((<HTMLInputElement>document.getElementById('txtDni'))).readOnly=true;
        (<HTMLInputElement>document.getElementById("cboPais")).value=ciudadanoModificar.pais;   
        ((<HTMLInputElement>document.getElementById("btn-success")).value)="Modificar";
       

    }


    public static FiltrarCiudadanosPorPais(){

        Test.Manejadora.AdministrarSpiner(true);
        var pais:string=(<HTMLInputElement>document.getElementById("cboPais")).value;

        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

        xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
       
        xmlhttp.send("caso=mostrar");

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                let ciudaArray : any[] = JSON.parse(xmlhttp.responseText);
                (<HTMLSelectElement>document.getElementById("divTabla")).innerHTML = "<table><tr><td> Nombre </td> <td> Apellido </td> <td> Edad </td> <td> Pais </td><td>DNI</td></tr>";
                for(let i=0; i<ciudaArray.length; i++)
                {
                    let stringCiudadano:string="";
                    if(ciudaArray[i].pais==pais){ 
                    stringCiudadano="<tr><td>"+ciudaArray[i].nombre+" </td><td>"+ciudaArray[i].apellido+" </td><td>"+ciudaArray[i].edad+" </td><td>"+ ciudaArray[i].pais+"</td><td>"+ ciudaArray[i].dni  +"<input type='button' value='Modificar' onclick='Test.Manejadora.ModificarCiudadano("+JSON.stringify(ciudaArray[i])+")'></input></td><td><input type='button' value='Eliminar' onclick='Test.Manejadora.EliminarCiudadano("+JSON.stringify(ciudaArray[i])+")'></input></tr><br>";
                    (<HTMLSelectElement>document.getElementById("divTabla")).innerHTML += stringCiudadano;
                }
                }
                (<HTMLSelectElement>document.getElementById("divTabla")).innerHTML += "</table>";
            }
        }

        Test.Manejadora.AdministrarSpiner(false);
    }




    public static CargarPaisesJSON(){

        Test.Manejadora.AdministrarSpiner(true);
        let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

        xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
       
        xmlhttp.send("caso=paises");

        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                let paisesArray : any[] = JSON.parse(xmlhttp.responseText);
                (<HTMLSelectElement>document.getElementById("cboPais")).innerHTML="";
                for(let i=0; i<paisesArray.length; i++)
                { 
                   (<HTMLSelectElement>document.getElementById("cboPais")).innerHTML+="<option>"+paisesArray[i].descripcion+"</option>";
                }
            }
        }

        Test.Manejadora.AdministrarSpiner(false);

    }

    protected static LimpiarForm():void{
alert("lala");
        (<HTMLInputElement>document.getElementById('txtNombre')).value="";
        ((<HTMLInputElement>document.getElementById('txtApellido')).value)="";
        ((<HTMLInputElement>document.getElementById('txtEdad')).value)="";
        ((<HTMLInputElement>document.getElementById('txtDni')).value)="";
        ((<HTMLInputElement>document.getElementById("btn-success")).value)="Agregar";
        (<HTMLInputElement>document.getElementById("cboPais")).value="Argentina";   


    }

    protected static AdministrarSpiner(mostrar:boolean):void{
            if(mostrar){

                (<HTMLImageElement>document.getElementById("imgSpinner")).src="./Javascript/Backend/gif-load.gif";
            }else{
                (<HTMLImageElement>document.getElementById("imgSpinner")).src="";
            }

            }

}

}