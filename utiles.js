import {Model} from "./Modelos/Model.js"

export function filaParseada(fila){
    const partes = fila.split(",");
    return new Model(
        parseInt(partes[0]),
        partes[1],
        partes[2],
        parseInt(partes[3]),
        partes[4]
    )

}