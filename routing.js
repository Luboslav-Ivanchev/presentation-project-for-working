let router={

    'Login':'Login',
    'Register':'Register',
    'Logout':'Logout',
    'CreateNewOffer':'CreateNewOffer',
    'Site':'Sneakers-Site',

};

let routes=(path)=>{
    let divRoot=document.getElementById('root');
    let template=Handlebars.compile(document.getElementById(router[path]).innerHTML);
    divRoot.innerHTML=template({});

}

function addEventsListener() {

    let aHrefs=document.querySelectorAll('a');
   let aLinks=Array.from(aHrefs);
   aLinks.forEach(a=>{
       a.addEventListener('click',function (e) {
           e.preventDefault();

           let url=new URL(e.currentTarget.href);
           history.pushState({},'',url.pathname);
           routes(url.pathname.slice(1));

       });
   })

}

addEventsListener();