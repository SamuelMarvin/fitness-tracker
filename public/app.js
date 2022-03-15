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
    let newuser = {name:"katy", username:"katyb"}
    $.post('/users')
    .done((newuser)=> console.log(data))
})