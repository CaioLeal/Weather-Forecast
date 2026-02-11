document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if(!cityName) {
        return showAlert('Você precisa digitar uma Cidade...');
    }
    console.log(cityName);

    const apiKey = 'f463ef2f2bf1cb99f98f33bd197bc1d6';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiURL);
    const json = await results.json();
    
    if(json.cod === 200) {
        showInfo({
            city:json.name,
            country:json.sys.country,
            temp:json.main.temp,
            tempMax:json.main.temp_max,
            tempMin:json.main.temp_min,
            description:json.weather[0].description,
            TempIcon:json.weather[0].icon,
            windSpeed:json.wind.speed,
            humidity:json.main.humidity
        });
    } else {
        showAlert('Cidade não encontrada...');
    }
});

function showInfo(json) {   
    showAlert('');
    document.querySelector('#city_name').innerHTML = `${json.name}, ${json.sys.country}`;
}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}