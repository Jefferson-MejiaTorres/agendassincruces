const tabla={q0:{h:'q1',x:'q2',c:'q7'},q1:{a:'q3',i:'q4',v:'q6',r:'q0',c:'q7'},q2:{h:'q1',x:'q2',r:'q0',c:'q7'},q3:{a:'q3',i:'q4',v:'q6',r:'q0',c:'q7'},q4:{f:'q5',c:'q7'},q5:{},q6:{r:'q0',c:'q7'},q7:{}};
export const nombres={q0:'Por programar',q1:'Programada',q2:'En conflicto',q3:'Recordada',q4:'En curso',q5:'Completada',q6:'Vencida sin iniciar',q7:'Cancelada'};
export const eventos={h:'Franja confirmada',x:'Cruce detectado',a:'Recordatorio emitido',i:'Actividad iniciada',f:'Actividad finalizada',v:'Venció sin iniciar',r:'Reprogramación',c:'Actividad cancelada',n:'Nota guardada'};
export const transicion=(estado,simbolo)=>Object.hasOwn(tabla,estado)?simbolo==='n'?estado:Object.hasOwn(tabla[estado],simbolo)?tabla[estado][simbolo]:'qE':'qE';
