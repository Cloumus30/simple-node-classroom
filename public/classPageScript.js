// Insert Data
const studentBtn = document.querySelector('.submit-student');
const classTitle = document.querySelector('.title');
const classId = classTitle.getAttribute('id').trim();
const tbody = document.getElementById('dataParent');
// Input Data
studentBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const studentName = document.querySelector('[name=name]').value;
    const studentNisn = document.querySelector('[name=nisn]').value;
    const studentStatus = document.querySelector('[name=status]').value;
    const data={
        name:studentName,
        nisn:studentNisn,
        status:studentStatus,
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
        if(response.errors){
            alert(response.message);
        }else{
            showing(response);
            document.querySelectorAll('form')[1].reset();
        }
        
    });
// Showing Data after inputed in Table 
function showing(query){
    let html = `<tr>
                            <td>1</td>
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
        // console.log(response);
        location.reload();
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