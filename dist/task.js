//selectors

const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.querySelector('.task-list');
const clearBtn = document.getElementById('clear-btn');
const feedback = document.querySelector('.feedback');

//let itemData = [];

let itemData = JSON.parse(localStorage.getItem('list')) || [];
if(itemData.length > 0){
    itemData.forEach(function(singleItem){
        itemList.insertAdjacentHTML(
            "beforeend", 
            `
            <div class= "task task-con">
                <h5 class="task-name">${singleItem}</h5>
                <div class="item-icons">
                    <a href="#" class="complete-icon item-icon"><i class="far fa-check-circle"></i></a>
                    <a href="#" class="edit-icon item-icon"><i class="far fa-edit"></i></a>
                    <a href="#" class="delete-icon item-icon"><i class="fas fa-trash"></i></a>
                </div>
            </div>
            `
        );
        handleItems(singleItem);
    });
}

//get values from local storage 


//event listeners
//form submission
itemForm.addEventListener("submit", function(event){
    event.preventDefault();
    const textValue = itemInput.value;
    //console.log(textValue);

if(textValue === ''){
    showFeedback('please enter valid value', 'danger');
}
else{
    //add item
    addItem(textValue);
    //clear the form
    itemInput.value = "";
    //add to item array
    itemData.push(textValue);
    //console.log(itemData);
    //local storage
    localStorage.setItem('list', JSON.stringify(itemData));
    //handle icons
    handleItems(textValue);

}
});

//clear form button
clearBtn.addEventListener('click', function(){
    itemData = [];
    localStorage.removeItem('list');
    const items = itemList.querySelectorAll('.task');
    if (items.length > 0){
        items.forEach(function(item){
            itemList.removeChild(item);
        });
    }
});



//functions

//flashMsg Handler
function showFeedback(msg, msgClass){
    document.getElementById('msg').innerHTML=`
    <div class="alert feedback ${msgClass}">
        ${msg}
    </div>
    `
    setTimeout(function() {
        // document.getElementById('msg').classList.remove();
        document.getElementById('msg').innerHTML=``
    }, 3000);
}

//add item
function addItem(value){
   const div = document.createElement("div");
   div.classList.add("task", "task-con");
   div.innerHTML = `<h5 class="task-name">${value}</h5>
   <div class="item-icons">
       <a href="#" class="complete-icon item-icon"><i class="far fa-check-circle"></i></a>
       <a href="#" class="edit-icon item-icon"><i class="far fa-edit"></i></a>
       <a href="#" class="delete-icon item-icon"><i class="fas fa-trash"></i></a>
   </div>`
    itemList.appendChild(div);
}

//handle item listeners
function handleItems(textValue){
    const items = itemList.querySelectorAll('.task');
    items.forEach(function(item) {
        if(item.querySelector('.task-name').textContent === textValue) {
            //complete event listener
            item.querySelector('.complete-icon').addEventListener('click', function(){
                item.querySelector('.task-name').classList.toggle('completed');
                this.classList.toggle('visibility');
            });

            //edit event listener
            item.querySelector('.edit-icon').addEventListener('click', function(){
                itemInput.value = textValue;
                itemList.removeChild(item);
                

                itemData = itemData.filter(function(item){
                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData));
                
            });

            //delete event listener
            item.querySelector('.delete-icon').addEventListener('click', function(){
                
                itemList.removeChild(item);
                

                itemData = itemData.filter(function(item){
                    return item !== textValue;
                });
                localStorage.setItem('list', JSON.stringify(itemData));
                showFeedback('Task deleted', 'success'); 
            });
        }
    });
}