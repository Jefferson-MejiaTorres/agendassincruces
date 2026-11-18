export const $=(s,r=document)=>r.querySelector(s);
export const txt=v=>{const el=document.createElement('span');el.textContent=String(v??'');return el.innerHTML.replaceAll('"','&quot;').replaceAll("'",'&#39;')};
export const logo='<img class="logo-acceso" src="/recursos/marca.png" alt="Agenda sin cruces">';
let temporizador;
export function informar(m){const d=$('#dialogo');if(d.open){let p=d.querySelector('.alerta');if(!p){p=document.createElement('p');p.className='alerta';p.setAttribute('role','alert');d.append(p)}p.textContent=m;return}$('#estado').textContent=m;clearTimeout(temporizador);temporizador=setTimeout(()=>$('#estado').textContent='',6500)}
export function dialogo(titulo,contenido){const d=$('#dialogo');d.innerHTML=`<button class="cerrar" aria-label="Cerrar">×</button>${logo}<h2 id="titulo-dialogo">${txt(titulo)}</h2>${contenido}`;$('.cerrar',d).onclick=()=>d.close();if(!d.open)d.showModal();return d}
export const cerrar=()=>$('#dialogo').close();
export const seguro=fn=>async(...args)=>{try{await fn(...args)}catch(e){informar(e?.message||'No se pudo completar la operación.')}};
