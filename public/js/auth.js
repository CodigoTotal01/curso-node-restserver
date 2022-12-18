const miFormulario = document.querySelector('form');


var url = (window.location.hostname.includes('localhost')) ? 'http://localhost:8080/api/auth/' : 'http://localhostheroku:4200/api/auth/'


miFormulario.addEventListener('submit', env => {
    env.preventDefault();

    const formData = {};


    //!obtener elementos de un formulario 
    for (let el of miFormulario.elements) {
        if (el.name.length > 0) { //tomar todos sus elemtnos que tengan nombre 
            formData[el.name] = el.value;

        }
    }

    fetch(url + "login", {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    }).then(resp => resp.json()) //estraer lo que nos retorna 
    .then(({msg, token}) => {

        if(msg){
            console.error(msg)
        }
        console.log(token)
        localStorage.setItem('token', token);

        window.location = "chat.html"
    }).catch(err => {
        console.log(err)
    })

    console.log(formData)

})


window.onload = function () {
    // COnfiguracion de nuestro login
    google.accounts.id.initialize({
        client_id: "586158528528-hqa6g1rle5m0ihg73fn7nq8uq3089l31.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });


    //renderizado del boton
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
            theme: "filled_black",
            size: "large",
            type: "standard",
            shape: "pill",
            locale: "es-PE",
            logo_alignment: "left"
        }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}


function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    // la respuesta como tal es el token

    // const responsePayload = jwt_decode(response.credential); //decodificado
    // console.log("ID: " + responsePayload.sub);
    // console.log('Full Name: ' + responsePayload.name);
    // console.log('Given Name: ' + responsePayload.given_name);
    // console.log('Family Name: ' + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);

    let id_token = response.credential;  // sin codificar

    const data = { id_token }

    //"endpoint de cgoogle"
    fetch(url + "google", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
        .then(({ token }) => { //extraer solo el token de la respuesta
            localStorage.setItem('token', token); //! guardar en el token
            
        window.location = "chat.html"
        })
        .catch(console.log)
}


//? para salir
function logout() {
    google.accounts.id.disableAutoSelect();
    alert("no funciona ");
}


