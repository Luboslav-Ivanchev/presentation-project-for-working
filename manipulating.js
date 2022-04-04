function manipulatingDom() {

    let shoes=document.getElementsByClassName('shoes')[0];

    fetch(`https://creating-shoes-af39d-default-rtdb.firebaseio.com/.json`)
        .then(res=>res.json())
        .then(data=>{

            let keys=Object.keys(data);

           shoes.innerHTML=keys.map(x=>`
             <div class="shoe" data-key="${x}">
                 <img src="${data[x].image}" alt="">
                 <h3>${data[x].name}</h3>
                 <a data-key="${x}" onclick="infoFunction(event)">Buy it for ${data[x].money}</a>
             </div>
           `).join('');

           let div1=document.createElement('div');
           let div2=document.createElement('div');
           shoes.appendChild(div1);
           shoes.appendChild(div2);

        });



}

function createFunction(event) {
    event.preventDefault();

    let textAreas=document.querySelectorAll('textarea');
    let textareaAll=Array.from(textAreas);
    let allInputs=document.querySelectorAll('input');
    let inputs=Array.from(allInputs);


    let textArea=textareaAll[0];
    let nameInput=inputs[0];
    let priceInput=inputs[1];
    let imageInput=inputs[2];
    let brandInput=inputs[3]

    let shoes=document.getElementsByClassName('shoes')[0];
    let divShoe=document.createElement('div');
    divShoe.setAttribute('class','shoe');


     let post=fetch(`https://creating-shoes-af39d-default-rtdb.firebaseio.com/.json`,{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({image:imageInput.value,money:priceInput.value,name:nameInput.value,brand:brandInput.value,description:textArea.textContent}),
     });

     post.then(res=>res.json())
         .then(data=>{
             divShoe.setAttribute('data-key',`${data.name}`)
             divShoe.innerHTML=`
                 <img src="${imageInput.value}" alt="">
                 <h3>${nameInput.value}</h3>
                 <a data-key="${data.name}" onclick="infoFunction(event)" >Buy it for ${priceInput.value}</a>
             `;
             shoes.appendChild(divShoe);

             textArea.value='';
             nameInput.value='';
             priceInput.value='';
             imageInput.value='';
              brandInput.value='';

         });

}

function infoFunction(event) {
    event.preventDefault();

    let id = event.target.getAttribute('data-key');

    let divClassOfferDetails = document.getElementsByClassName('offer-details')[0];
    divClassOfferDetails.setAttribute('data-key',id);

    fetch(`https://creating-shoes-af39d-default-rtdb.firebaseio.com/${id}/.json`)
        .then(res => res.json())
        .then(data=>{

            divClassOfferDetails.innerHTML = `
                            <h1>${data.name}</h1>
                       <div class="info">
                         <img src="${data.image}" alt="">
                <div class="description">${data.description}
                    <br>
                    <br>
                    <p class="price">${data.money}</p>
                </div>
            </div>
            <div class="actions">
                <a  data-key="${id}" onclick="editFunction(event)">Edit</a>
                <a  data-key="${id}" onclick="deleteFunction(event)">Delete</a>
                <a  data-key="${id}" onclick="buyIt(event)">Buy</a>
                <span></span>
                        </div>`;


        });


}

function deleteFunction(event) {

    console.log(event.target);

    let id=event.target.getAttribute('data-key');
    console.log(id);

    fetch(`https://creating-shoes-af39d-default-rtdb.firebaseio.com/${id}/.json`,{
        method:'DELETE',
        headers:{'Content-type':'application/json'},
    })
        .then(res=>res.json())
        .then(data=>{

            let divClassOfferDetails = document.getElementsByClassName('offer-details')[0];
            divClassOfferDetails.innerHTML = `
                            <h1></h1>
                       <div class="info">
                         <img src="" alt="">
                <div class="description">
                    <br>
                    <br>
                    <p class="price"></p>
                </div>
            </div>
            <div class="actions">
                <a style="display: none"></a>
                <a style="display: none"></a>
                <a style="display: none"></a>
                <span></span>
                 </div>`;

            let divShoe=document.getElementsByClassName('shoe');
            let divsShoe=Array.from(divShoe);
            divsShoe.forEach(shoe=>{

                if(shoe.getAttribute('data-key')===id){
                    shoe.remove();
                }

            });

        });


}





function buyIt(event) {

     let divActions=document.getElementsByClassName('actions')[0];
    let span=divActions.children[3];
    span.textContent='You bought it' ;



}


function editFunction(event) {
           event.preventDefault();

           let id=event.target.getAttribute('data-key');

    let allInputs=document.querySelectorAll('input');
    let inputAll=Array.from(allInputs);
    let textareaS=document.querySelectorAll('textarea');
    let textarea=Array.from(textareaS);



    let textarea2=textarea[1];
    let nameInput=inputAll[4]; let priceInput=inputAll[5]; let imageInput=inputAll[6]; let brandInput=inputAll[7];


 fetch(`https://creating-shoes-af39d-default-rtdb.firebaseio.com/${id}/.json`)

     .then(res=>res.json())
     .then(data=>{

         nameInput.value=`${data.name}`;
         priceInput.value=`${data.money}`;
         imageInput.value=`${data.image}`;
         brandInput.value=`${data.brand}`;
         textarea2.textContent=`${data.description}`;

     });


  let buttons=document.querySelectorAll('button');
  let buttonAll=Array.from(buttons);

  let buttonEdit=buttonAll[1];

   buttonEdit.addEventListener('click',function (e) {
       e.preventDefault();


       let edit=fetch(`https://creating-shoes-af39d-default-rtdb.firebaseio.com/${id}/.json`,{
           method:'PATCH',
           headers:{'Content-type':'application/json'},
           body:JSON.stringify({name:nameInput.value,money:priceInput.value,image:imageInput.value,brand:brandInput.value,description:textarea2.value}),
       });

           edit.
           then(res=>res.json())
           .then(data=>{


               let shoesP=document.getElementsByClassName('shoes')[0]
               let shoe=document.getElementsByClassName('shoe');
               let shoes=Array.from(shoe);

               let id=event.target.getAttribute('data-key');

               shoes.forEach(shoe=>{

                   if(shoe.getAttribute('data-key')===id){
                       shoe.innerHTML=`
                       <img src="${imageInput.value}">
               <h3>${nameInput.value}</h3>
               <a>Buy it for ${priceInput.value}</a>
                       `;

                   }

               });

               let divClassOfferDetails=document.getElementsByClassName('offer-details')[0];
               if(divClassOfferDetails.getAttribute('data-key')===id){

                   divClassOfferDetails.innerHTML=`
                   
                   <h1>${nameInput.value}</h1>
            <div class="info">
                <img src="${imageInput.value}"
                    alt="">
                <div class="description">${textarea2.value}
                    <br>
                    <br>
                    <p class="price">${priceInput.value}</p>
                </div>
                <div class="actions">
                 <a onclick="editFunction(event)">Edit</a>
                 <a onclick="deleteFunction(event)">Delete</a>
                 <a onclick="buyIt(event)">Buy</a>
                 <span></span>
             </div>
                 `;

               }


               nameInput.value='';
               priceInput.value='';
               imageInput.value='';
               brandInput.value='';
               textarea2.value='';
           });


   })

}