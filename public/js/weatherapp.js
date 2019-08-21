

    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const p1 = document.querySelector('#location');
    const p2 = document.querySelector('#temperature');
    weatherForm.addEventListener('submit', (event) =>  {
        event.preventDefault();
        const location = search.value;



        fetch('http://localhost:3000/weather?address='+ location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    p1.textContent = data.error
                }
                else {
                    console.log(data)
                    p1.textContent = data.name;
                    p2.textContent = data.temperature;
                }
            
            })})
        
    });