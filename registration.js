function registrationFunc(event) {
event.preventDefault();

   let inputs=document.querySelectorAll('input');
   let inputsAll=Array.from(inputs);
   let emailInput=inputsAll[0];
   let passwordInput=inputsAll[1];
   let rePasswordInput=inputsAll[2];

    let postRequest=fetch(`https://creating-acounts-default-rtdb.firebaseio.com/CreatingAcounts.json`,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({email:emailInput.value,password:passwordInput.value,rePassword:rePasswordInput.value}),
    });

    postRequest.then(res=>res.json())
        .then(info=>{
            emailInput.value='';
            passwordInput.value='';
            rePasswordInput.value='';
        })


     checkInputs();
}


function checkInputs() {


    let formRegistration=document.forms['registration'].children;
    let divs=Array.from(formRegistration);
    let inputs=document.querySelectorAll('input');
    let inputsAll=Array.from(inputs);
    let divFoot=document.getElementById('footer');

    let emailInput=inputsAll[0];
    let emailDiv=divs[0];
    let passwordInput=inputsAll[1];
    let passwordDiv=divs[1];
    let rePasswordInput=inputsAll[2];
    let rePasswordDiv=divs[2];
    let pEmail=document.createElement('p');
     pEmail.style.color='red';
     let pPassword=document.createElement('p');
     pPassword.style.color='red';

     let pRePassword=document.createElement('p');
     pRePassword.style.color='red';


  if(emailInput.value==='' && passwordInput.value==='' && rePasswordInput.value===''){
        emailInput.style.border='solid red 2px';
        pEmail.textContent='Email is not valid';
        emailDiv.prepend(pEmail);
        passwordInput.style.border='solid red 2px';
        pPassword.textContent='Password is not valid'
        passwordDiv.prepend(pPassword);
        rePasswordInput.style.border='solid red 2px';
        pRePassword.textContent='RePassword is not valid';
        rePasswordDiv.prepend(pRePassword);

    } else if(passwordInput.value==='' && rePasswordInput.value===''){
      passwordInput.style.border='solid red 2px';
      pPassword.textContent='Password is not valid'
      passwordDiv.prepend(pPassword);
      rePasswordInput.style.border='solid red 2px';
      pRePassword.textContent='RePassword is not valid';
      rePasswordDiv.prepend(pRePassword);

  }else if(emailInput.value==='' && rePasswordInput.value===''){
      emailInput.style.border='solid red 2px';
      pEmail.textContent='Email is not valid';
      emailDiv.prepend(pEmail);
      rePasswordInput.style.border='solid red 2px';
      pRePassword.textContent='RePassword is not valid';
      rePasswordDiv.prepend(pRePassword);

  }else if(emailInput.value==='' && passwordInput.value===''){

      emailInput.style.border='solid red 2px';
      pEmail.textContent='Email is not valid';
      emailDiv.prepend(pEmail);
      passwordInput.style.border='solid red 2px';
      pPassword.textContent='Password is not valid'
      passwordDiv.prepend(pPassword);

  }else if(emailInput.value===''){

      emailInput.style.border='solid red 2px';
      pEmail.textContent='Email is not valid';
      emailDiv.prepend(pEmail)
  }else if(passwordInput.value===''){
      passwordInput.style.border='solid red 2px';
      pPassword.textContent='Password is not valid'
      passwordDiv.prepend(pPassword);
  }else if(rePasswordInput.value===''){

      rePasswordInput.style.border='solid red 2px';
      pRePassword.textContent='RePassword is not valid';
      rePasswordDiv.prepend(pRePassword);

  }else if(passwordInput.value!==rePasswordInput.value){

      passwordInput.style.border='solid red 2px';
      pPassword.textContent='Password is not valid'
      passwordDiv.prepend(pPassword);
      rePasswordInput.style.border='solid red 2px';
      pRePassword.textContent='RePassword is not valid';
      rePasswordDiv.prepend(pRePassword);


  }else {
      divFoot.innerHTML='<p> You have successfully logged in</p>';
  }


}