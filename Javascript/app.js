var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.apellido = apellido;
            this.nombre = nombre;
            this.edad = edad;
        }
        Persona.prototype.personaToString = function () {
            return ('"nombre":"' + this.nombre + '","apellido":"' + this.apellido + '","edad":' + this.edad + ',');
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="./persona.ts" />
var Entidades;
(function (Entidades) {
    var Ciudadano = /** @class */ (function (_super) {
        __extends(Ciudadano, _super);
        function Ciudadano(nombre, apellido, edad, dni, pais) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.DNI = dni;
            _this.pais = pais;
            return _this;
        }
        Ciudadano.prototype.personaToJson = function () {
            var persona = _super.prototype.personaToString.call(this);
            return JSON.parse('{' + persona + '"pais":"' + this.pais + '","dni":' + this.DNI + '}');
        };
        return Ciudadano;
    }(Entidades.Persona));
    Entidades.Ciudadano = Ciudadano;
})(Entidades || (Entidades = {}));
/// <reference path="./persona.ts" />
/// <reference path="./Ciudadano.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCiudadano = function () {
            Test.Manejadora.AdministrarSpiner(true);
            //Tomo los valores del index
            var nombre = document.getElementById('txtNombre').value;
            var apellido = (document.getElementById('txtApellido').value);
            var edad = parseInt(document.getElementById('txtEdad').value);
            var dni = parseInt(document.getElementById('txtDni').value);
            var pais = document.getElementById("cboPais").value;
            var unCiudadano = new Entidades.Ciudadano(nombre, apellido, edad, dni, pais);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            if (document.getElementById("btn-success").value == "Agregar") {
                xmlhttp.send("caso=agregar&cadenaJson=" + JSON.stringify(unCiudadano.personaToJson()));
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        Test.Manejadora.AdministrarSpiner(false);
                        Test.Manejadora.LimpiarForm();
                        var respuesta = JSON.parse(xmlhttp.responseText);
                        if (respuesta.TodoOK) {
                            console.log("agregado correctamente");
                        }
                    }
                };
            }
            else {
                xmlhttp.send("caso=modificar&cadenaJson=" + JSON.stringify(unCiudadano.personaToJson()));
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        Test.Manejadora.AdministrarSpiner(false);
                        var respuesta = JSON.parse(xmlhttp.responseText);
                        if (respuesta.TodoOK) {
                            console.log("modificado correctamente");
                            Test.Manejadora.MostrarCiudadanos();
                            Test.Manejadora.LimpiarForm();
                        }
                    }
                };
            }
        };
        Manejadora.MostrarCiudadanos = function () {
         
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var ciudaArray = JSON.parse(xmlhttp.responseText);
                    document.getElementById("divTabla").innerHTML = "<table><tr><td> Nombre </td> <td> Apellido </td> <td> Edad </td> <td> Pais </td><td>DNI</td></tr>";
                    for (var i = 0; i < ciudaArray.length; i++) {
                        var stringCiudadano = "";
                        stringCiudadano = "<tr><td>" + ciudaArray[i].nombre + " </td><td>" + ciudaArray[i].apellido + " </td><td>" + ciudaArray[i].edad + " </td><td>" + ciudaArray[i].pais + "</td><td>" + ciudaArray[i].dni + "<input type='button' value='Modificar' onclick='Test.Manejadora.ModificarCiudadano(" + JSON.stringify(ciudaArray[i]) + ")'></input></td><td><input type='button' value='Eliminar' onclick='Test.Manejadora.EliminarCiudadano(" + JSON.stringify(ciudaArray[i]) + ")'></input></tr><br>";
                        document.getElementById("divTabla").innerHTML += stringCiudadano;
                    }
                    document.getElementById("divTabla").innerHTML += "</table>";
                }
            };
        };
        Manejadora.EliminarCiudadano = function (ciudadano) {
            var ciudadanoEliminar = ciudadano;
            /*  alert(JSON.stringify(ciudadano));
             confirm("Seguro que va a eliminar a "+ciudadanoEliminar.nombre+" "+ciudadanoEliminar.apellido);*/
            var r = confirm("Desea eliminar al ciudadano? " + ciudadanoEliminar.nombre + " " + ciudadanoEliminar.apellido);
            if (r == true) {
                Test.Manejadora.AdministrarSpiner(true);
                var xmlhttp_1 = new XMLHttpRequest();
                xmlhttp_1.open("POST", "./Javascript/BACKEND/administrar.php/", true);
                xmlhttp_1.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xmlhttp_1.send("caso=eliminar&cadenaJson=" + JSON.stringify(ciudadano));
                xmlhttp_1.onreadystatechange = function () {
                    if (xmlhttp_1.readyState == 4 && xmlhttp_1.status == 200) {
                        Test.Manejadora.AdministrarSpiner(false);
                        var respuesta = JSON.parse(xmlhttp_1.responseText);
                        if (respuesta.TodoOK) {
                            Test.Manejadora.MostrarCiudadanos();
                        }
                    }
                };
            }
            else {
                alert("accion canceladaa");
            }
        };
        Manejadora.ModificarCiudadano = function (ciudadano) {
            var ciudadanoModificar = ciudadano;
            document.getElementById('txtNombre').value = ciudadanoModificar.nombre;
            document.getElementById('txtApellido').value = ciudadanoModificar.apellido;
            (document.getElementById('txtEdad').value) = ciudadanoModificar.edad;
            (document.getElementById('txtDni').value) = ciudadanoModificar.dni;
            (document.getElementById('txtDni')).readOnly = true;
            document.getElementById("cboPais").value = ciudadanoModificar.pais;
            (document.getElementById("btn-success").value) = "Modificar";
           
        };
        Manejadora.FiltrarCiudadanosPorPais = function () {
            Test.Manejadora.AdministrarSpiner(true);
            var pais = document.getElementById("cboPais").value;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=mostrar");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var ciudaArray = JSON.parse(xmlhttp.responseText);
                    document.getElementById("divTabla").innerHTML = "<table><tr><td> Nombre </td> <td> Apellido </td> <td> Edad </td> <td> Pais </td><td>DNI</td></tr>";
                    for (var i = 0; i < ciudaArray.length; i++) {
                        var stringCiudadano = "";
                        if (ciudaArray[i].pais == pais) {
                            stringCiudadano = "<tr><td>" + ciudaArray[i].nombre + " </td><td>" + ciudaArray[i].apellido + " </td><td>" + ciudaArray[i].edad + " </td><td>" + ciudaArray[i].pais + "</td><td>" + ciudaArray[i].dni + "<input type='button' value='Modificar' onclick='Test.Manejadora.ModificarCiudadano(" + JSON.stringify(ciudaArray[i]) + ")'></input></td><td><input type='button' value='Eliminar' onclick='Test.Manejadora.EliminarCiudadano(" + JSON.stringify(ciudaArray[i]) + ")'></input></tr><br>";
                            document.getElementById("divTabla").innerHTML += stringCiudadano;
                        }
                    }
                    document.getElementById("divTabla").innerHTML += "</table>";
                }
            };
            Test.Manejadora.AdministrarSpiner(false);
        };
        Manejadora.CargarPaisesJSON = function () {
            Test.Manejadora.AdministrarSpiner(true);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "./Javascript/BACKEND/administrar.php/", true);
            xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("caso=paises");
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var paisesArray = JSON.parse(xmlhttp.responseText);
                    document.getElementById("cboPais").innerHTML = "";
                    for (var i = 0; i < paisesArray.length; i++) {
                        document.getElementById("cboPais").innerHTML += "<option>" + paisesArray[i].descripcion + "</option>";
                    }
                }
            };
            Test.Manejadora.AdministrarSpiner(false);
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById('txtNombre').value = "";
            (document.getElementById('txtApellido').value) = "";
            (document.getElementById('txtEdad').value) = "";
            (document.getElementById('txtDni').value) = "";
            document.getElementById("cboPais").value = "Argentina";
            document.getElementById("btn-success").value="Agregar";
        };
        Manejadora.AdministrarSpiner = function (mostrar) {
            if (mostrar) {
                document.getElementById("imgSpinner").src = "./Javascript/Backend/gif-load.gif";
            }
            else {
                document.getElementById("imgSpinner").src = "";
            }
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
