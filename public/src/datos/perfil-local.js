const perfil='agendaSinCruces.perfil.v1', sesion='agendaSinCruces.sesion';
export const nombre=()=>localStorage.getItem(perfil)||'';
export const dentro=()=>sessionStorage.getItem(sesion)==='1'&&!!nombre();
export function entrar(n){if(!nombre()){if(!n?.trim()||n.trim().length>80)throw Error('Escribe un nombre de hasta 80 caracteres.');localStorage.setItem(perfil,n.trim())}sessionStorage.setItem(sesion,'1')}
export function salir(){sessionStorage.removeItem(sesion)}
