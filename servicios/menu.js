import readline  from "readline";
import { cargarDatos} from "./CallServicios.js";
import { CantidadLamadasPorClasificacion, mostrarClasificacionLLamadas, generarReportesHTML } from "./reportes.js";


export function Menu(){
    let opcion;
    let llamadas =  [];
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout  
    })
    mostrarMenu();
    

    function mostrarMenu (){
        console.log("\n--------------- Menú-------------");
        console.log("1 => cargar datos");
        console.log("2 => Mostrar registros en consola");
        console.log("3 => generar pagina web");
        console.log("4 => salir");
        rl.question("Seleccione una opcion: \n",seleccion);
        ;
    }
    function seleccion(opcion){
        switch (opcion) {
            case "1":
                    llamadas = cargarDatos("./ArchivosDeDatos/entrada.txt")
                        if(llamadas){
                            console.log("Se cargo archivo");
                            mostrarMenu();
                        }else{
                            console.log("sucedio un fallo al cargar archivo");
                            mostrarMenu();
                     }
                break;

            case "2":
                if (llamadas != null) {
                    
                    CantidadLamadasPorClasificacion(llamadas)
                    mostrarClasificacionLLamadas(llamadas); 
                    mostrarMenu();
                }else {
                    console.log("No has cargado los datos de las llamadas");   
                    mostrarMenu();
                }
                     
                break;
            case "3":
                if (llamadas != null ) {
                    generarReportesHTML(llamadas)
                    mostrarMenu();
                    
                }else{
                    console.log("No has cargado los datos de las llamadas"); 
                    mostrarMenu();
                }
                break; 
            case "4":
                console.log("saliendo del programa...");
                process.exit(0);
                break;
        
            default:
                console.log("Elije una opcion valida");
                mostrarMenu();
                break;
        }
    }
}