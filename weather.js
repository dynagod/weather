let resultBox = document.getElementById('resultBox');
let inputBox = document.getElementById('textBox');
let search = document.getElementById('searchButton');
let cityName = document.getElementById('cityName');
let dateBox = document.getElementById('date');
let weather = document.getElementById('weather');
let weatherImage = document.getElementById('weatherImage');
let tempBox = document.getElementById('temp');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let error = document.getElementById('error');
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let img;

inputBox.addEventListener('keyup', () => {
    error.classList.add('hidden');
    let input = inputBox.value;
    if(input.length){
        resultBox.classList.remove('hidden');
        let result = cityList.filter((val) => {
            return val.toLowerCase().includes(input.toLowerCase());
        });

        if(result.length){
            let content = result.map((val,idx) => {
                return `<li>${val}</li>`
            });
            resultBox.innerHTML = content.join('');

            let listItems = resultBox.querySelectorAll('li');
            
            listItems.forEach((listItem) => {
                listItem.addEventListener('click', () => {
                    inputBox.value = listItem.innerHTML;
                    resultBox.innerHTML = '';
                    resultBox.classList.add('hidden');
                });
            });
        }else{
            resultBox.innerHTML = '';
            resultBox.classList.add('hidden');
        }
    }else{
        resultBox.innerHTML = '';
        resultBox.classList.add('hidden');
    }
});

search.addEventListener('click', () => {
    resultBox.innerHTML = '';
    resultBox.classList.add('hidden');
    let city = inputBox.value.toLowerCase();
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=434155bfeb2040971ba52934ae269c7c&units=metric`;
    (async () => {
        try{
            let response = await fetch(URL);
            if(response.ok){
                let data = await response.json();
                let date = new Date(data.dt * 1000);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let ampm = hours >= 12 ? "pm" : "am";
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;

                cityName.innerHTML = inputBox.value;
                cityName.style = "margin-top: 50px;";
                dateBox.innerHTML = `<div>${day[date.getDay()]}, ${hours}:${minutes} ${ampm}</div> <div>${data.weather[0].description}</div>`;
                weatherImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
                weather.classList.add('margin');
                tempBox.innerHTML = `${data.main.temp}°C`;
                humidity.innerHTML = `<i class="fa-solid fa-water fa-2x"></i> <div class="kno"> <h3>${data.main.humidity}%</h3> <p>Humidity</p> </div>`;
                wind.innerHTML = `<i class="fa-solid fa-wind fa-2x"></i> <div class="kno"> <h3>${data.wind.speed} km/h</h3> <p>Wind Speed</p> </div>`;
            }else{
                error.classList.remove('hidden');
            }
        }catch(err){
            console.error(err);
            error.classList.remove('hidden');
        }
    })();
});