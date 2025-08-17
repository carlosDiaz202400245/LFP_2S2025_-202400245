import fs from "fs"
import { filaParseada } from "../utiles.js";

export function cargarDatos (ruta){
    try{
        const data = fs.readFileSync(ruta,"utf-8");
        const filas = data.split("\n").slice(1);
        return filas.map(fila => filaParseada(fila));
    }catch(e){
        console.log("Error al cargar archivo pa", e.message)
        return [];
    }
}
