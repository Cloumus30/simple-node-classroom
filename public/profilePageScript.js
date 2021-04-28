// Get The delete Button
document.addEventListener('click',e=>{
    if(e.target.classList.contains('delete-class')){
        // Delete The Data
        const id = e.target.getAttribute('id');
        const data = {id:id};
        if(confirm('Deleting Class is delete all the students too, delete Class?')){
            customFetch('/delete-class','DELETE',data)
            .then(res=>{
                deleting(id);
            })
            .catch(err=>{
                console.log(err);
                alert(err);
            });
        }
    }
});

// Delete UI
function deleting(id){
    const element = document.getElementById(id);
    const navsideItem = document.querySelector(`.data-${id}`);
    navsideItem.parentElement.remove();
    element.parentElement.parentElement.remove();
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