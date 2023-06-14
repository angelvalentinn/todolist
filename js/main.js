window.addEventListener('load', () => {

    const input = document.getElementById('entrada');
    const submit = document.getElementById('enviar');
    const tareasContainer = document.querySelector('.tareas');
    const msgError = document.querySelector('.msg-error');
    const subtitle = document.querySelector('.subtitle');
    
    let agenda = JSON.parse(localStorage.getItem('agenda')) || []; //Obtenemos del LS el array de agenda, en el caso de que no haya nada devolvemos un array vacío
    
    agenda.length == 0 ? subtitle.innerText = 'Lista Vacía': subtitle.innerText = 'Lista'; //Cuando no haya nada en la agenda que muestre un mensaje de lista vacía
    
    cargarProductosDOM(); //Cada vez que se cargue la página o se recargué, cargamos el array de agenda en el DOM
    funcionesEliminar(); //Habilitamos la funcion eliminar y editar de cada elemento de la agenda
    funcionesEditar(); 
    
    submit.addEventListener('click', () => {
        
        const text = input.value;
    
        if(text == '') {
            msgError.style.display = 'block';
            setTimeout(() => {  //Validamos en el caso de que lo que se mande en el input este vacío
                msgError.style.display = 'none';
            }, 2000);
        } else {
            subtitle.innerText = 'Lista';
            agenda.push({text:text});
            cargarProductosDOM();
            funcionesEliminar(); //pusheamos en el array de agenda cuando mandemos algo y lo cargamos en el dom
            funcionesEditar();
            input.value = ''; //para mejor facilidad a la hora de enviar muchas agendas
            input.focus();
        }
    
    })
    
    function cargarProductosDOM() {
        tareasContainer.innerHTML = '';
    
        agenda.forEach(item => {
    
            const div = document.createElement('div');
            div.classList.add('tarea');
            
            const p = document.createElement('input');
            p.classList.add('tarea__title');
            p.setAttribute('readonly','true');
            p.value = item.text;
        
            div.appendChild(p);
        
            const btns = document.createElement('div');
            btns.classList.add('btns');
        
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('eliminar');
            btnEliminar.innerText = 'Eliminar';
        
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('editar');
            btnEditar.innerText = 'Editar';
    
            btns.appendChild(btnEditar);
            btns.appendChild(btnEliminar);
            div.appendChild(btns);
            
            tareasContainer.append(div);
        })
    
        localStorage.setItem('agenda',JSON.stringify(agenda)); //cargamos en el dom y cada vez q carguemos q se guarde en LS
    }
    
    function funcionesEliminar() {
        let eliminar = document.querySelectorAll('.eliminar');
        eliminar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemText = e.target.parentNode.previousElementSibling.value;
                const index = agenda.findIndex(item => item.text.includes(itemText)); //Indice de donde su ubica el elemento que tiene este id
                
                agenda.splice(index,1);
                agenda.length==0 ? subtitle.innerText = 'Lista Vacía': subtitle.innerText = 'Lista';
    
                localStorage.setItem('agenda',JSON.stringify(agenda));
                cargarProductosDOM(agenda);
                funcionesEliminar();
                funcionesEditar();
            })
        
        })
    }
    
    let inputViejo;
    let inputViejoIndex;
    
    function funcionesEditar() {
        let editar = document.querySelectorAll('.editar');
        
        editar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const input = e.target.parentNode.previousElementSibling;
            
                if(btn.innerText.toLowerCase() == "editar") {
                    
                    input.removeAttribute('readonly');
                    input.style.color = 'var(--clr-p)';
                    input.style.transition = '.4s ease';
                    input.focus();
        
                    btn.innerText = 'Guardar';
                    inputViejo = input.value;
                    inputViejoIndex = agenda.findIndex(item => item.text == inputViejo)
                    
                } else if((btn.innerText.toLowerCase() == "guardar")) {
                    btn.innerText = 'Editar';
                    input.setAttribute('readonly','true');
                    input.style.color = 'var(--clr-w)';
                    agenda[inputViejoIndex].text = input.value;
                    localStorage.setItem('agenda',JSON.stringify(agenda));
                }
                
            })
        })
    
    }
    
})

