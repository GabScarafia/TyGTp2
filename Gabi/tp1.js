document.addEventListener("DOMContentLoaded", function() {
    function cambiarContenidoMichi(api) {
      fetch(`https://catfact.ninja/fact`)
      .then(response => response.json())
      .then(data => {
          const col2 = document.getElementById('col2');
          col2.innerHTML = "<a>Resultado de la API <b>'CatFact'</b>:</a><a class='api-output'>" + data.fact + "</a>";
      })
      .catch(error => {
          console.error('Error al hacer la solicitud HTTP:', error);
      });
      
    }
    function cambiarContenidoBored(api) {
      // Hacemos la solicitud HTTP a la API seleccionada
      fetch("https://www.boredapi.com/api/activity")
      .then(response => response.json())
      .then(data => {
          // Actualizamos el contenido de Col2 con la respuesta obtenida
          const col2 = document.getElementById('col2');
          col2.innerHTML = "<a>Resultado de la API <b>'BoredApi'</b>:</a><a class='api-output'>" + data.activity + "</a>";
      })
      .catch(error => {
          console.error('Error al hacer la solicitud HTTP:', error);
      });
    }
    //listener de los botones
    const api1 = document.querySelector('#api1');
    api1.addEventListener('click', () => cambiarContenidoMichi('api1'));
    const api2 = document.querySelector('#api2');
    api2.addEventListener('click', () => cambiarContenidoBored('api2'));
    //Frase Random
    const frases = ['¡Aguante Messi!', '¡Vamos River!', 'Soy la Frase 3'];
    const randomIndex = Math.floor(Math.random() * frases.length);
    const fraseElement = document.getElementById('frase');
    fraseElement.innerText = frases[randomIndex];
    fraseElement.classList.add('random' + randomIndex);
}); 
