/* adding a new to do  */
let todosList
if(localStorage.getItem('todo')===null)
{

     todosList = [];

}
else{

     todosList = JSON.parse(localStorage.getItem('todo'));
}

const ulParent = document.querySelector('ul');
const addTodo = document.querySelector('.add');
const searchEngine = document.querySelector('.search input');

localStorage.setItem('todo',JSON.stringify(todosList));

document.querySelector('.search').addEventListener('submit',(e)=>{
    e.preventDefault();
});

const list = ulParent.children;
const relFn = ()=>{

if(JSON.parse(localStorage.getItem('todo')).length !== 0)
{
    ulParent.innerHTML = '';
    JSON.parse(localStorage.getItem('todo')).forEach((el)=>{
       
        ulParent.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
     <span>${el}</span>
     <i class="far fa-trash-alt delete"></i>`;





    });


}
}
relFn();


const addToList = (listElement) =>{

    todosList.push(listElement)
    localStorage.setItem('todo',JSON.stringify(todosList));
}
const removeFromList = (val) =>{

    let inx =   JSON.parse(localStorage.getItem('todo')).indexOf(val);

    let lis = JSON.parse(localStorage.getItem('todo'));

    lis.splice(inx,1);
  

    localStorage.setItem('todo',JSON.stringify(lis));

}

const generateTemplate = (todo)=>{

    const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
     <span>${todo}</span>
     <i class="far fa-trash-alt delete"></i>
     `;

    ulParent.innerHTML+=html;
    addToList(todo);



};



addTodo.addEventListener('submit',(e)=>{

    e.preventDefault();

   
    const input = addTodo.add.value.trim();

    if(input.length)
    {
        generateTemplate(input);
        
    }

    addTodo.reset();




});



ulParent.addEventListener('click',(e)=>{
   
    if(e.target.classList.contains('delete')) 
    {
       
        removeFromList(e.target.previousElementSibling.textContent);
        e.target.parentElement.remove();


    }

});




const Filterup = (term)=>{



   
    Array.from(list).filter((val)=>{

        return !(val.textContent.toLowerCase().includes(term));
    }).forEach((through)=>{
        through.classList.add('searchFilter')
    });


    Array.from(list).filter((val)=>{

        return (val.textContent.toLowerCase().includes(term));
    }).forEach((through)=>{
        through.classList.remove('searchFilter')
    });
};


searchEngine.addEventListener('keyup',(e)=>{

    const inputVal = searchEngine.value.toLowerCase().trim();
   
    Filterup(inputVal);
});
