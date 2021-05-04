// const submitBtn = document.querySelector('.class-submit');
const classForm = document.getElementById('class');
const lessonForm = document.getElementById('lesson');
const studentsNumForm = document.getElementById('studentNum');
const teacherForm = document.getElementById('teacher');

document.addEventListener('click',e=>{
    if (e.target.classList.contains('class-submit')){
        e.preventDefault();
        // console.log(e.target);
        const data={
            className:classForm.value,
            lesson:lessonForm.value,
            studentsNum:studentsNumForm.value,
            teacher:teacherForm.value
        };
        customFetch('/inputClass','POST',data)
            .then(response=>{
                if (response.errors){
                    // console.log(response.errors);
                    return ShowValidateError(response.errors);
                }
                const contentSide = document.querySelector('.content-side');
                addAlert(contentSide,"Data Kelas Berhasil Disimpan");
                setTimeout(location.reload(),3000);
                // return location.reload();
                // console.log(response);
            })
            .catch(err=>{
                console.log(err);
            })
    }
})

// submitBtn.addEventListener('click',e=>{
    
// })

document.addEventListener('click',e=>{
    if(e.target.classList.contains('class-update')){
        e.preventDefault();
        // console.log(e.target);
        const id = document.querySelector('[name=id]');
        const data={
            className:classForm.value,
            lesson:lessonForm.value,
            studentsNum:studentsNumForm.value,
            teacher:teacherForm.value,
            id:id.value
        };
        customFetch('/update-class?_method=PUT','POST',data)
            .then(response=>{
                if (response.errors){
                    // console.log(response.errors);
                    return ShowValidateError(response.errors);
                }
                // console.log(response);
                window.location='/';
            })
            .catch(err=>{
                console.log(err);
            })
    }
})

function ShowValidateError(err){
    let errors = {className:'',teacher:'',studentsNum:'',lesson:''};
    err.forEach(er => {
        errors[er.param]=er.msg;
    });
    const classNameValid = document.getElementById('className-valid');
    const teacherValid = document.getElementById('teacher-valid');
    const studentsNumValid = document.getElementById('studentsNum-valid');
    const lessonValid = document.getElementById('lesson-valid');

    classNameValid.innerHTML = errors.className;
    teacherValid.innerHTML = errors.teacher;
    studentsNumValid.innerHTML = errors.studentsNum;
    lessonValid.innerHTML = errors.lesson;
}



// Fetch Api
async function customFetch(route,method,data){
    // const data = {id:id};
    const option={method: method, 
    headers: {
        'Content-Type': 'application/json'
        },
    body: JSON.stringify(data)
    };
    const result = await fetch(route,option);
    const response = await result.json();
    return response;
};

function addAlert(element,message){
    const html =`<div class="alert alert-success" role="alert">
    ${message}
    </div>`
    element.insertAdjacentHTML('afterbegin',html);
}