
const form = document.querySelector(".form")

const DateTime = luxon.DateTime;

const now = DateTime.now();

//Envío de formulario
document.addEventListener("submit", (e) => {

    const name = document.querySelector("#nombre").value;

    e.preventDefault();

    const response = document.querySelector(".contact-form-response");

    // ---FETCH-----

    fetch("https://formsubmit.co/ajax/pato.atanasoff0815@gmail.com", {
        method: "POST",
        body: new FormData(e.target)
    })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
            console.log(json);
            response.classList.remove("none");
            form.reset();
        })
    Swal.fire({
        title: `Gracias por su compra ${name}, en breve le será enviado su pedido`,
        html: `<span class="sweet-fechas">Fecha de compra: ${now.toLocaleString()}</span>
            `,
        position: 'center',
        color: "#13131a",
        icon: 'success',
        background: "var(--main-color)",
        showConfirmButton: true,
        confirmButtonColor: "#13131a",
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "../index.html";
        }
    });
    setTimeout(() => (window.location.href = "../index.html"), 10000);
});

