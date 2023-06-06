var form = document.getElementById('addForm');
var newitem = document.getElementById('items');
var nam=document.getElementById('name');
var email=document.getElementById('email');
var phone=document.getElementById('phone');
form.addEventListener('submit',submitForm);


newitem.addEventListener('click',delitem)
function submitForm(e){
    e.preventDefault();
    
    let myobj={
        name : nam.value,
        email: email.value,
        phone:phone.value
    }

    axios.post('https://crudcrud.com/api/705a8d7c6ae74cd196206fe1c9f0a409/appoinmentData',
    myobj).then(res=>{
        showData(res.data)
        console.log(res)
    }).catch(err =>console.log(err));

    let myobj_serial=JSON.stringify(myobj);
    localStorage.setItem(email.value,myobj_serial);
    
    

}
function showData(obj){
    var li=document.createElement('li');
    li.className='list-group-item';
    li.appendChild(document.createTextNode("Name: "));
    li.appendChild(document.createTextNode(obj.name));
    li.appendChild(document.createTextNode(" - Email :"));
    li.appendChild(document.createTextNode(obj.email));
    li.appendChild(document.createTextNode(" - Phone :"));
    li.appendChild(document.createTextNode(obj.phone));
    //delete Btn
    var del=document.createElement('button');
    del.className='btn btn-danger btn-sm float-right delete';
    del.appendChild(document.createTextNode('X'));

    //Edit btn
    var edt=document.createElement('button');
    edt.className='btn btn-warning btn-sm float-right edit';
    edt.appendChild(document.createTextNode('Edit'))

    li.appendChild(edt)
    li.appendChild(del)
    newitem.appendChild(li);
    nam.value=""
    email.value=""
    phone.value=""

}
function delitem(e){
    
    if(e.target.classList.contains('delete')){
        if(confirm("Are you Sure, You want to Delete it?")){
            var li=e.target.parentElement;
            var deletitem=li.childNodes[3].textContent;
            newitem.removeChild(li)
            console.log(deletitem)
            localStorage.removeItem(deletitem)

            
        }
    }
    if(e.target.classList.contains('edit')){
        if(confirm("Are you Sure, You want to Edit it?")){
            var li=e.target.parentElement;
            var edititem=li.childNodes[3].textContent;
            nam.value=li.childNodes[1].textContent;
            email.value=li.childNodes[3].textContent;
            phone.value=li.childNodes[5].textContent;
            newitem.removeChild(li)
            console.log(edititem)
            localStorage.removeItem(edititem)
            
        }
    }
}
