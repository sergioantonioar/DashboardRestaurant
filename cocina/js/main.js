let listElements = document.querySelectorAll('.list__button--click');

listElements.forEach(listElement => {
    listElement.addEventListener('click',()=>{
        // Una vez se seleccione crea clase arrow y la siguiente se lo quita
        listElement.classList.toggle('arrow')

        let height = 0;
        let menu = listElement.nextElementSibling; //tomar al hermano adyacente de listElement


        if(menu.clientHeight == '0'){
            height = menu.scrollHeight; //el alto cambia al alto minimo para existir
        }

        //si no esta en 0 lo oculta
        menu.style.height = `${height}px`; //modificar el estilo del menu con el valor de height
    })
});