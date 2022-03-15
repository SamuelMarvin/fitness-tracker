$('.testButton1').on('click', ()=>{
    $.get('/users',(data)=>{
        console.log(data);
    })
})

$('.testButton2').on('click', ()=>{
    $.get('/id/workouts',(data)=>{
        console.log(data);
    })
})

$('.testButton3').on('click', ()=>{
    $.get('/id/exercise',(data)=>{
        console.log(data);
    })
})

$('.testButton4').on('click', ()=>{
    $.get('/id/goals',(data)=>{
        console.log(data);
    })
})


$('.postnewuser').on('click', ()=>{
    $.post('/users',(data={name:katy, username:katyb,})=> console.log(data), "json")
})