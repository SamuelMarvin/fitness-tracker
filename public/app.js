$('.testButton').on('click', ()=>{
    $.get('/users',(data)=>{
        console.log(data);
    })
})