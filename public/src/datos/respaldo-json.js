import {validar,exigir} from '../dominio/validar-datos.js';
export async function leerArchivo(file){exigir(file&&file.size<=5*1024*1024,'Elige un JSON de hasta 5 MB.');let d;try{d=JSON.parse(await file.text())}catch{throw Error('El archivo no es un JSON válido. La agenda anterior sigue disponible.')}return validar(d)}
export function descargar(datos){const url=URL.createObjectURL(new Blob([JSON.stringify(datos,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='agenda-sin-cruces.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
