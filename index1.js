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
        // console.log(el);
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
    // console.log(lis);

    localStorage.setItem('todo',JSON.stringify(lis));



    // console.log(todosList);
}

const generateTemplate = (todo)=>{

    const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
     <span>${todo}</span>
     <i class="far fa-trash-alt delete"></i>
     `;


    //     ulParent.append(html);   // do not use this here in this case bcz if u want to use append first u need to create a element and add it
    ulParent.innerHTML+=html;
    addToList(todo);



};



addTodo.addEventListener('submit',(e)=>{

    e.preventDefault();

    /*

              e.preventDefault();


         let newElement = document.createElement('span');
         newElement.innerHTML = `<li class="list-group-item d-flex justify-content-between align-items-center">
         <span>make a veggie pie</span>
         <i class="far fa-trash-alt delete"></i>`;

         newElement.querySelector('span').textContent = addTodo.add.value.trim();
         // console.log(newElement.textContent);
         document.querySelector('ul').append(newElement);

         addTodo.reset();  //reset method is for clearing the input field this reset method resets the input field's in the respective forms


    */
    const input = addTodo.add.value.trim();

    if(input.length)
    {
        generateTemplate(input);
        // addTodo.reset(); //you can add this here or down also
        // reset method is for clearing the input field this reset method resets the input field's in the respective forms


    }

    addTodo.reset();




});



ulParent.addEventListener('click',(e)=>{
    // console.log(e.target.tagName);

    if(e.target.classList.contains('delete')) //classList.contains('delete') returns true if it has class delete
    {
        // console.log(e.target.previousElementSibling.textContent);
        removeFromList(e.target.previousElementSibling.textContent);
        e.target.parentElement.remove();


    }

});


//key up for search





const Filterup = (term)=>{



    //hiding the unmatched
    Array.from(list).filter((val)=>{

        return !(val.textContent.toLowerCase().includes(term));
    }).forEach((through)=>{
        through.classList.add('searchFilter')
    });



    //making visible the hidden

    Array.from(list).filter((val)=>{

        return (val.textContent.toLowerCase().includes(term));
    }).forEach((through)=>{
        through.classList.remove('searchFilter')
    });
};


searchEngine.addEventListener('keyup',(e)=>{

    const inputVal = searchEngine.value.toLowerCase().trim();
    // console.log(inputVal);
    Filterup(inputVal);
});

// searchEngine.addEventListener('keyup',(e)=>{
//      const text = searchEngine.value.toLowerCase().trim();
//      Array.from(list).filter((val)=>{
//           return !val.textContent.toLowerCase().includes(text);
//      }).forEach((ele)=>{                                                      //same function as above but written whole code in one place
//           ele.classList.add('searchFilter');
//      });
//      Array.from(list).filter((val)=>{
//           return val.textContent.toLowerCase().includes(text);
//      }).forEach((ele)=>{
//           ele.classList.remove('searchFilter');
//      });

// });