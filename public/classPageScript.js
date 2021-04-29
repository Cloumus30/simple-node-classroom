// Insert Data
const studentBtn = document.querySelector('.submit-student');
const classTitle = document.querySelector('.title');
const classId = classTitle.getAttribute('id').trim();
const tbody = document.getElementById('dataParent');

// Input Data
studentBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const studentName = document.querySelector('[name=name]');
    const studentNisn = document.querySelector('[name=nisn]');
    const studentStatus = document.querySelector('[name=status]');
    const data={
        name:studentName.value,
        nisn:studentNisn.value,
        status:studentStatus.value,
        idClass:classId
    };
    const option= {method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
    };
    
    
        const result = await fetch('/inputStudent',option);
        const response = await result.json();
        // Validation Error Input Students
        if(response.errors){
            // console.log(response.errors);
            const errors = validateError(response.errors,'Number');
            studentValidError(errors,'input');
        }else{
            studentValidError({name:'',nisn:'',status:''},'input');
            showing(response);
            document.querySelectorAll('form')[1].reset();
        }
        
    });

// Validating errors 
function validateError(err,query){
    let errors = {name:'',nisn:'',status:''};
    if(query=='Number'){
        Object.values(err).forEach((er)=>{
            // console.log(er);
            if(er.kind=='Number'){
                errors[er.path]='nisn Must be Number';
            }else{
                errors[er.path]=er.message;
            }
        });
    }else if((query=='noNumber') && (err.kind) ){ //for update validation that nisn is string
        errors.nisn='nisn Must be Number';
    }
    return errors;   
}

// Showing warning on the validate UI
function studentValidError(errors,query){
    let nameValid=nisnValid=statusValid='';
    if(query=='input'){
        nameValid = document.getElementById('name-input-valid');
        nisnValid = document.getElementById('nisn-input-valid');
        statusValid = document.getElementById('status-input-valid');
    }else if(query=='update'){
        nameValid = document.getElementById('name-update-valid');
        nisnValid = document.getElementById('nisn-update-valid');
        statusValid = document.getElementById('status-update-valid');
    }
    nameValid.innerHTML=errors.name;
    nisnValid.innerHTML=errors.nisn;
    statusValid.innerHTML=errors.status;
}

// Showing Data after inputed in Table 
function showing(query){
    const numOfDat = document.querySelectorAll('.btn-delete').length;
    let html = `<tr>
                            <td>${numOfDat+1}</td>
                            <td>${query.name}</td>
                            <td>${query.nisn}</td>
                            <td>${query.status}</td>
                            <td class="action-table">
                                <button data-id-update="${query._id}" class="btn btn-primary btn-update" data-bs-toggle="modal" data-bs-target="#updateStudentModal">Edit</button>
                                <button id="${query._id}" type="button" class="btn btn-danger btn-delete">Delete</button>
                            </td>
                        </tr>`
    tbody.insertAdjacentHTML('beforeend',html);
}

// Deleting Data
document.addEventListener('click',async (e)=>{
    if (e.target.classList.contains('btn-delete')){
        const id = e.target.getAttribute('id');
        const data={id:id};
        const option={method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
            };
        const confirms = confirm("Delete Data?");
        if(confirms){
            const result = await fetch("/delete-student",option);
            const response = await result.json();
            deleting(response._id);
        }
    }
});

function deleting(id){
    const element = document.getElementById(id);
    element.parentElement.parentElement.remove();
}


// Show Current Data
document.addEventListener('click',async (e)=>{
    if(e.target.classList.contains('btn-update')){
        const id = e.target.getAttribute('data-id-update');
        const data={id:id};
        const option={method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
            };
        const result = await fetch("/update-student", option);
        const response = await result.json();
        popModal(response)
    }
});


// Update Data
const updateStudentBtn = document.querySelector('.update-student');
updateStudentBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const studentName = document.getElementById('nameUpdate').value;
    const studentNisn = document.getElementById('nisnUpdate').value;
    const studentStatus = document.getElementById('statusUpdate').value;
    const data={
        name:studentName,
        nisn:studentNisn,
        status:studentStatus,
        id:updateStudentBtn.getAttribute('data-update-id')
    }
    const option={method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
            };
        const result = await fetch("/update-student/save", option);
        const response = await result.json();
        if(response.errors){
            // console.log(response.errors);
            const errors = validateError(response.errors,'Number');
            studentValidError(errors,'update');
        }else{
            // Check if the nisn is not a number
            const errors = validateError(response,'noNumber');
            studentValidError(errors,'update');
            // if nisn is number that refresh
            if(errors.nisn==""){
                location.reload();
            }
            // console.log(errors);
        }
        
})

// Showing The Data in Update Modal
function popModal(query){
    const studentName = document.getElementById('nameUpdate');
    const studentNisn = document.getElementById('nisnUpdate');
    const studentStatus = document.getElementById('statusUpdate');
    updateStudentBtn.setAttribute('data-update-id',query._id);
    studentName.value = query.name;
    studentNisn.value = query.nisn;
    studentStatus.value = query.status;
};