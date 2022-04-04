function loginFunc(event) {
    event.preventDefault();

    let inputs=document.querySelectorAll('input');
    let inputAll=Array.from(inputs);
    let emailInput=inputAll[0];
    let passwordInput=inputAll[1];
    let forms=document.getElementById('login').children;
    let divsForm=Array.from(forms);
    let emailDiv=divsForm[0];
    let passwordDiv=divsForm[1];

    let pEmail=document.createElement('p');
    let pPassword=document.createElement('p');


    let login=fetch(`https://creating-acounts-default-rtdb.firebaseio.com/CreatingAcounts.json`);

    login.then(res=>res.json())
        .then(data=>{

            let values=Object.values(data);

            values.forEach(everyObject=>{

                let valuesForEveryObject=Object.values(everyObject);


                if(!valuesForEveryObject.includes(passwordInput.value)&&!valuesForEveryObject.includes(emailInput.value)){

                    emailInput.style.border='solid red 2px';
                    passwordInput.style.border='solid red 2px';
                    pPassword.style.color='red';
                    pPassword.textContent='Password is not valid';
                    passwordDiv.prepend(pPassword);
                    pEmail.style.color='red';
                    pEmail.textContent='Email is not valid';
                    emailDiv.prepend(pEmail);

                } else if(!valuesForEveryObject.includes(passwordInput.value)) {

                    passwordInput.style.border='solid red 2px';
                    pPassword.style.color='red';
                    pPassword.textContent='Password is not valid';
                    passwordDiv.prepend(pPassword);

                }else if(!valuesForEveryObject.includes(emailInput.value)){

                    emailInput.style.border='solid red 2px';
                    pEmail.style.color='red';
                    pEmail.textContent='Email is not valid';
                    emailDiv.prepend(pEmail);
                }
               else if(valuesForEveryObject.includes(passwordInput.value)&&valuesForEveryObject.includes(emailInput.value)){
                    passwordInput.style.border='solid green 2px';
                    emailInput.style.border='solid green 2px';
                    pEmail.textContent='';
                    pPassword.textContent='';

                    let ulElements=document.querySelector('ul');

                    let uls=Array.from(ulElements.children);
                    let liText=uls[4];
                    liText.innerHTML=`Welcome, ${emailInput.value} |
                    <a href="/Logout">Logout</a>`;
                    loggedIn();

                }

            });

        })



}


function loggedIn() {


    let divRoot=document.getElementById('root');
    let template=Handlebars.compile(document.getElementById('LoggedIn').innerHTML);
    divRoot.innerHTML=template({});
    history.pushState('','','LoggedIn');



    manipulatingDom();

}