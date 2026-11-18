import { $, txt, seguro, informar } from './util.js';
import { cruces, tramo, reserva, min } from '../dominio/horarios.js';

function leer(form) {
  const datos = Object.fromEntries(new FormData(form));
  return { ...datos, titulo: datos.titulo.trim(), avisoMin: Number(datos.avisoMin), flexible: datos.flexible === 'si' };
}

export function formulario({ c, id, fecha, ir, marco, cambiar }) {
  const original = c.datos.actividades.find(a => a.id === id);
  const a = original || { fecha, inicio: '14:00', fin: '15:00', prioridad: 'media', avisoMin: 10, flexible: true };
  marco(id ? 'Editar actividad' : 'Registrar actividad', 'Escribe el nombre y el horario. Te avisaremos si coincide con otra reserva.', `
    <form id="form-act" class="panel registro" novalidate>
      <label>Nombre de la clase o actividad<input name="titulo" required maxlength="100" placeholder="Ej. Cálculo diferencial" value="${txt(a.titulo)}"></label>
      <div class="fecha-horas"><label>Fecha<input name="fecha" type="date" required value="${a.fecha}"></label><label>Desde<input name="inicio" type="time" required value="${a.inicio}"></label><label>Hasta<input name="fin" type="time" required value="${a.fin}"></label></div>
      <div class="disponibilidad" role="status" aria-live="polite" aria-atomic="true"><span class="senal" aria-hidden="true"></span><div><b id="dispo-titulo"></b><p id="dispo-texto"></p></div></div>
      <details class="preferencias"><summary>Más opciones <small>Recordatorio, prioridad y descripción</small></summary><div class="extras">
        <div class="dos"><label>Prioridad<select name="prioridad">${['alta','media','baja'].map(x=>`<option value="${x}" ${a.prioridad===x?'selected':''}>${x[0].toUpperCase()+x.slice(1)}</option>`).join('')}</select></label><label>Horario<select name="flexible"><option value="si">Flexible</option><option value="no" ${!a.flexible?'selected':''}>Fijo</option></select></label></div>
        <label>Aviso previo (minutos)<input name="avisoMin" type="number" min="0" max="1440" step="1" required value="${a.avisoMin}"></label><label>Descripción (opcional)<textarea name="descripcion" maxlength="1000">${txt(a.descripcion)}</textarea></label><p class="nota">Los avisos funcionan mientras la agenda está abierta.</p></div></details>
      <div class="guardar-fila"><button class="btn guardar" type="submit">Guardar en mi agenda</button><button class="sin-guardar" type="button">Volver sin guardar</button></div>
    </form>`, 'Registro de actividades');
  const f = $('#form-act'), guardar = $('.guardar', f);
  function revisar() {
    const info = leer(f), valida = info.fecha && info.inicio && info.fin && info.inicio < info.fin;
    const choque = valida ? cruces({ ...info, id }, c.datos.actividades)[0] : null;
    const bloqueada = choque && original && reserva(original);
    const titulo = !valida ? 'Revisa el horario' : choque ? 'Este horario tiene un cruce' : 'Horario disponible';
    const mensaje = !valida ? 'Indica una fecha y una hora de fin posterior al inicio.' : choque ? `Coincide con ${choque.titulo} de ${tramo(info,choque).replace('–',' a ')}. ${bloqueada?'Elige otra franja. Tu reserva original se mantiene.':'Puedes cambiar la hora o guardar una propuesta sin reservar tiempo.'}` : `${info.inicio}–${info.fin} · ${min(info.fin)-min(info.inicio)} min. Se reservará esta franja al guardar.`;
    $('.disponibilidad').dataset.tipo = !valida ? 'neutro' : choque ? 'cruce' : 'libre';
    $('#dispo-titulo').textContent = titulo; $('#dispo-texto').textContent = mensaje;
    guardar.textContent = choque && !bloqueada ? 'Guardar como propuesta' : id ? 'Guardar cambios' : 'Guardar en mi agenda';
    guardar.disabled = Boolean(bloqueada);
    return choque;
  }
  f.oninput = e => { if(e.target.hasAttribute('aria-invalid')) { e.target.removeAttribute('aria-invalid');e.target.removeAttribute('aria-describedby');$(`#error-${e.target.name}`)?.remove() } revisar() };
  $('.sin-guardar').onclick = () => ir(id?'detalle':'agenda',id);
  f.onsubmit = seguro(e => {
    e.preventDefault(); const info = leer(f); let primero;
    for (const el of f.querySelectorAll('input,textarea,select')) {
      $(`#error-${el.name}`)?.remove();el.removeAttribute('aria-invalid');el.removeAttribute('aria-describedby');
      const msg = el.name==='titulo' && !info.titulo ? 'Escribe el nombre de la clase o actividad.' : !el.validity.valid ? 'Introduce un valor válido.' : el.name==='fin' && info.fin<=info.inicio ? 'La hora de fin debe ser posterior al inicio.' : '';
      if (!msg) continue;
      const error=document.createElement('span');error.id=`error-${el.name}`;error.className='errorcampo';error.textContent=msg;el.after(error);el.setAttribute('aria-invalid','true');el.setAttribute('aria-describedby',error.id);if(el.closest('details'))el.closest('details').open=true;primero??=el;
    }
    if(primero){primero.focus();return} const choque=revisar();if(guardar.disabled)return;
    const nuevo=c.guardar(info,id); cambiar(info.fecha);
    if(choque){ir('conflicto',nuevo);informar('Propuesta guardada sin reserva. Elige un horario libre.');return}
    document.querySelector(`[data-id="${nuevo}"]`)?.classList.add('recien-guardada');informar(`${info.titulo} guardada en tu agenda · ${info.inicio}–${info.fin}.`);
  });revisar();
}
