window.onload = function() {
  document.getElementById('input').focus();
};

var input = document.getElementById('input');

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById('mainbtn').click();
  }
});


const getForecast = (e) => {
  address = document.getElementById('input').value;

  fetch(`./weather?address=${address}`).then((response) => {
    response.json().then((data) =>{

      if(data.error) {
        document.getElementById('displayZone').innerHTML = `<h2>${data.error}</h2>`;
      } else {
        document.getElementById('displayZone').innerHTML = `
        <h2>For ${data.place},</h2>
        <p>It is ${data.summary}, ${data.temperature} degrees, and there is a ${data.precipProbability*100}% chance of rain.
        `;

        
      }
    })
  })
  document.getElementById('input').value = '';
  e.preventDefault();
};


document.getElementById('mainbtn').addEventListener('click', getForecast);