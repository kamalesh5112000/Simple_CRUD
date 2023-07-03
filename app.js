console.log("app fuck it")
var form = document.getElementById('addForm');
var newitem = document.getElementById('items');
var nam=document.getElementById('name');
var email=document.getElementById('email');
var phone=document.getElementById('phone');
form.addEventListener('submit',submitForm);


newitem.addEventListener('click',delitem)
async function submitForm(e){
    e.preventDefault();
    
    let myobj={
        name : nam.value,
        email: email.value,
        phone:phone.value
    }
    
    const res = await axios.post('http://localhost:3000/user',myobj)
    newitem.innerHTML='';
    display();


            // .then((res)=>{
            //     console.log(res)
            //     if(res.data.length>0){
            //         for(var i=0;i<res.data.length;i++){
            //             if (email.value===res.data[i].email){
            //                 const id=res.data[i]._id;
            //                 console.log(id)
            //                 axios.put(`http://localhost:3000/user`,myobj)
            //                 .then(()=>{
            //                     // newitem.innerHTML='';
            //                     // display();
            //                     console.log("user added")
            //                 }).catch(err=>console.log(err))
            //                 flag=true;
            //                 break;
    
            //             }
            //         }
            //         if (flag==false){
            //             axios.post('http://localhost:3000/user',
            //         myobj).then(res=>{
            //             newitem.innerHTML='';
            //             display();
            //         }).catch(err =>console.log(err));
            //         }

            //     }else{
            //         axios.post('http://localhost:3000/user',
            //         myobj).then(res=>{
            //             newitem.innerHTML='';
            //             display();
            //         }).catch(err =>console.log(err));

            //     }
                
            // }).catch(err=>console.log(err))
    
    

}
async function display(){
   
        const res = await axios.get('http://localhost:3000/user');
        for(var i=0;i<=res.data.length;i++){
            showData(res.data[i])
        }
        // const localstorageObj = localStorage;
        // const localstoragekeys = Object.keys(localstorageObj)
        // console.log(localstoragekeys)
        // for(var i=0;i<localstoragekeys.length;i++){
        //     const key =localstoragekeys[i]
        //     const userdetails=localstorageObj[key]
        //     const userparse=JSON.parse(userdetails);
        //     showData(userparse)
        // }
    
}
display()
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
            axios.get('http://localhost:3000/user')
            .then((res)=>{
                console.log(res)
                for(var i=0;i<res.data.length;i++){
                    if (deletitem===res.data[i].email){
                        const id=res.data[i].id;
                        console.log(id)
                        axios.delete(`http://localhost:3000/user/${id}`)
                        .then(()=>{
                            newitem.innerHTML='';
                            display();
                        }).catch(err=>console.log(err))


                    }
                }
            }).catch(err=>console.log(err))

            
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
