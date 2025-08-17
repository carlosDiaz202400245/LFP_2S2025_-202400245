import fs from "fs"
export function mostrarClasificacionLLamadas(llamadas) {
    const stats = calcularEstadisticas(llamadas);
    console.log("------------Clasificacion de llamadas ---------");
    console.log(`Buenas (4 - 5 estrellas): ${stats.clasificacion.Buena} (${((stats.clasificacion.Buena / stats.totalLlamadas) * 100).toFixed(2)}%)`);
    console.log(`Medias (2 - 3 estrellas): ${stats.clasificacion.Media} (${((stats.clasificacion.Media / stats.totalLlamadas) * 100).toFixed(2)}%)`);
    console.log(`Malas (0 - 1 estrella): ${stats.clasificacion.Mala} (${((stats.clasificacion.Mala / stats.totalLlamadas) * 100).toFixed(2)}%)`);
}

export function CantidadLamadasPorClasificacion(llamadas) {
    const stats = calcularEstadisticas(llamadas);
    console.log("------------Cantidad de llamadas por estrellas---------");
    for (let estrellas = 0; estrellas <= 5; estrellas++) {
        console.log(`${estrellas} estrellas: ${stats.porEstrella[estrellas]} llamadas`);
    }
}

export function generarReportesHTML(llamadas){
    const stats = calcularEstadisticas(llamadas)
    let html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Historial de Llamadas</title>
            <style>
                body {
        font-family: "Segoe UI", Tahoma, sans-serif;
        background-color: #fafafa;
        color: #333;
        padding: 20px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin: 15px 0;
        font-size: 14px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        border-radius: 6px;
        overflow: hidden;
    }

    th, td {
        padding: 10px 12px;
        text-align: left;
    }

    th {
        background: #4a90e2;
        color: #fff;
        font-weight: 600;
        letter-spacing: 0.5px;
    }

    tr:nth-child(even) {
        background: #f9f9f9;
    }

    tr:hover {
        background: #eef5ff;
    }
            </style>
        </head>
        <body>
            <h1>Reporte Completo del CallCenter</h1>
            
            <!-- Sección de Estadísticas Generales -->
            <h2>Estadísticas Generales</h2>
            <div class="stats-container">
                <div class="stat-card">
                    <h3>Total de Llamadas</h3>
                    <div class="stat-value">${stats.totalLlamadas}</div>
                </div>
                <div class="stat-card">
                    <h3>Llamadas Buenas</h3>
                    <div class="stat-value">${stats.clasificacion.Buena}</div>
                    <div>(${((stats.clasificacion.Buena / stats.totalLlamadas) * 100).toFixed(2)}%)</div>
                </div>
                <div class="stat-card">
                    <h3>Llamadas Medias</h3>
                    <div class="stat-value">${stats.clasificacion.Media}</div>
                    <div>(${((stats.clasificacion.Media / stats.totalLlamadas) * 100).toFixed(2)}%)</div>
                </div>
                <div class="stat-card">
                    <h3>Llamadas Malas</h3>
                    <div class="stat-value">${stats.clasificacion.Mala}</div>
                    <div>(${((stats.clasificacion.Mala / stats.totalLlamadas) * 100).toFixed(2)}%)</div>
                </div>
            </div>

            <!-- Sección de Historial de Llamadas -->
            <h2>Historial de Llamadas</h2>
            <table>
                <tr>
                    <th>ID Operador</th>
                    <th>Nombre Operador</th>
                    <th>Estrellas</th>
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                </tr>
    `;

    // Historial de llamadas
    llamadas.forEach(llamada => {
        html += `
                <tr>
                    <td>${llamada.id_operador}</td>
                    <td>${llamada.nombre_operador}</td>
                    <td>${llamada.estrellas} (${contarEstrellas(llamada.estrellas)} estrellas)</td>
                    <td>${llamada.id_cliente}</td>
                    <td>${llamada.nombre_cliente}</td>
                </tr>
        `;
    });

    // Sección de Operadores
    html += `
            </table>

            <h2>Listado de Operadores</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
    `;
    stats.operadores.forEach(op => {
        html += `
                <tr>
                    <td>${op.id}</td>
                    <td>${op.nombre}</td>
                </tr>
        `;
    });

    // Sección de Clientes
    html += `
            </table>

            <h2>Listado de Clientes</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
    `;
    stats.clientes.forEach(cli => {
        html += `
                <tr>
                    <td>${cli.id}</td>
                    <td>${cli.nombre}</td>
                </tr>
        `;
    });

    // Sección de Rendimiento
    html += `
            </table>

            <h2>Rendimiento de Operadores</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Llamadas Atendidas</th>
                    <th>Porcentaje</th>
                </tr>
    `;
    stats.rendimiento.forEach(op => {
        html += `
                <tr>
                    <td>${op.id}</td>
                    <td>${op.nombre}</td>
                    <td>${(op.porcentaje * stats.totalLlamadas / 100).toFixed(0)}</td>
                    <td>${op.porcentaje}%</td>
                </tr>
        `;
    });

    // Sección de Distribución por Estrellas
    html += `
            </table>

            <h2>Distribución por Estrellas</h2>
            <table>
                <tr>
                    <th>Estrellas</th>
                    <th>Cantidad</th>
                    <th>Porcentaje</th>
                </tr>
    `;
    for (let estrellas = 1; estrellas <= 5; estrellas++) {
        html += `
                <tr>
                    <td>${estrellas}</td>
                    <td>${stats.porEstrella[estrellas]}</td>
                    <td>${((stats.porEstrella[estrellas] / stats.totalLlamadas) * 100).toFixed(2)}%</td>
                </tr>
        `;
    }

    // Cierre del HTML
    html += `
            </table>
        </body>
        </html>
    `;

    // Guardar el archivo
    if (!fs.existsSync("./Reportes")) {
        fs.mkdirSync("./Reportes");
    }
    fs.writeFileSync("./Reportes/reporte_completo.html", html);
    console.log("Reporte generado exitosamente en ./Reportes/reporte_completo.html");
}


   function calcularEstadisticas(llamadas) {
    // Filtrar solo llamadas válidas
    const llamadasValidas = llamadas.filter(llamada => 
        llamada && 
        llamada.id_operador && 
        llamada.nombre_operador && 
        llamada.estrellas && 
        llamada.id_cliente && 
        llamada.nombre_cliente
    );

    const totalLlamadas = llamadasValidas.length;
    const clasificacion = { Buena: 0, Media: 0, Mala: 0 };
    const porEstrella = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const operadores = {};
    const clientes = {};

    llamadasValidas.forEach(llamada => {
        const estrellas = contarEstrellas(llamada.estrellas);
        
        // Asegurarnos que el conteo esté en el rango 0-5
        const estrellasValidas = Math.max(0, Math.min(5, estrellas));
        porEstrella[estrellasValidas]++;

        // Clasificación
        if (estrellasValidas >= 4) clasificacion.Buena++;
        else if (estrellasValidas >= 2) clasificacion.Media++;
        else clasificacion.Mala++;

        // Operadores
        if (!operadores[llamada.id_operador]) {
            operadores[llamada.id_operador] = {
                nombre: llamada.nombre_operador,
                llamadas: 0
            };
        }
        operadores[llamada.id_operador].llamadas++;

        // Clientes
        if (!clientes[llamada.id_cliente]) {
            clientes[llamada.id_cliente] = llamada.nombre_cliente;
        }
    });

    const rendimiento = Object.keys(operadores).map(id => ({
        id,
        nombre: operadores[id].nombre,
        porcentaje: ((operadores[id].llamadas / totalLlamadas) * 100).toFixed(2)
    }));

    return {
        clasificacion,
        porEstrella,
        operadores: Object.keys(operadores).map(id => ({ id, nombre: operadores[id].nombre })),
        clientes: Object.keys(clientes).map(id => ({ id, nombre: clientes[id] })),
        rendimiento,
        totalLlamadas
    };
}


function contarEstrellas(estrellasStr) {
    if (!estrellasStr || typeof estrellasStr !== 'string') return 0;

    const valores = estrellasStr.split(';')
        .map(e => e.trim())
        .filter(e => e !== '');
    
    return valores.slice(0, 5).filter(e => e.toLowerCase() === 'x').length;
}