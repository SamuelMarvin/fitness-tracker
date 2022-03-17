// $('.postnewuser').on('click', ()=>{    
//     $.ajax({
//         type: "POST",
//         url: '/users',
//         data: JSON.stringify({ "name":"katy", "username":"katyb" }),
//         success: (res)=>console.log(res),
//         contentType: "application/json",
//       });
// })

const nameInput = document.querySelector('.nameInput').value;
const usernameInput = document.querySelector('.usernameInput').value;
const passInput = document.querySelector('.passInput').value;
$('.submitUser').on('click',()=>{
  $.ajax({
    type: "post",
    url: "/createUser",
    data: JSON.stringify({ "name":`${nameInput}`, "username":`${usernameInput}`, "password": `${passInput}`}),
    success: (res)=>console.log(res),
    contentType: "application/json",
  });
})


$('.login').on('click', ()=>{
  const username = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;
  // console.log(username, password);
  if(username && password){
    $.ajax({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      type: "get",
      url: `/login/${username}/${password}`,
      // data: JSON.stringify({"password": `${password}`}),
      success: (res)=>console.log(res),
    })

  }
})

