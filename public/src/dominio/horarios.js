export const min=h=>Number(h.slice(0,2))*60+Number(h.slice(3));
export const hora=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
export const reserva=a=>['q1','q3','q4'].includes(a.estado);
export const cruces=(a,lista)=>lista.filter(b=>b.id!==a.id&&reserva(b)&&b.fecha===a.fecha&&a.inicio<b.fin&&b.inicio<a.fin);
export const tramo=(a,b)=>[a.inicio>b.inicio?a.inicio:b.inicio,a.fin<b.fin?a.fin:b.fin].join('–');
export function alternativas(a,lista){if(!a.flexible)return [];const dur=min(a.fin)-min(a.inicio),desde=Math.ceil(Math.max(360,min(a.inicio))/15)*15,libres=[];for(const [ini,lim] of [[desde,1320],[360,Math.min(desde-1,1320)]])for(let m=ini;m<=lim&&m+dur<=1320&&libres.length<3;m+=15){const b={...a,inicio:hora(m),fin:hora(m+dur)};if(!cruces(b,lista).length)libres.push(b)}return libres.sort((x,y)=>x.inicio.localeCompare(y.inicio))}
export const instante=(a,campo)=>Date.parse(`${a.fecha}T${a[campo]}:00-05:00`);
export const hoy=(d=new Date())=>new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Bogota'}).format(d);
export const moverDia=(f,n)=>new Date(Date.parse(`${f}T12:00:00Z`)+n*86400000).toISOString().slice(0,10);
export const fechaLarga=f=>new Intl.DateTimeFormat('es-CO',{dateStyle:'full',timeZone:'America/Bogota'}).format(new Date(f+'T12:00:00Z'));
export const estadoTemporal=(a,ahora)=>!['q1','q3'].includes(a.estado)?null:ahora>=instante(a,'fin')?'v':!a.avisoEmitido&&ahora>=instante(a,'inicio')-a.avisoMin*60000?'a':null;
