const API_KEY = `e9c783dd8bf47188787fdb34e77b61c7`;
const lang = 'kr';
let dataList = [];
const temp ="";
// 현재 위치 정보 navigator 호출

navigator.geolocation.getCurrentPosition(
    (position) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        console.log(`현재 위도 및 경도: ${lat}, ${lon}`);

        // 위치 정보 수행
        getWeather(lat, lon);
    },
    (error) => {
        console.error("Error getting location:", error.message);
    }
);

// 위도와 경도를 인자로 받아 날씨 정보를 얻는 함수
//&units=metric : kelvin -> 섭씨 온도
const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${lang}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        dataList = data;
        
        console.log("Response:", response);
        console.log("Weather Data:", data);
        console.log("온도", data.main.temp);
        console.log("최고온도", data.main.temp_max);
        console.log("최저온도", data.main.temp_min);
        console.log("시 이름", data.name);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};
const getTime = () =>{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 월은 0부터 시작하므로 +1 
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const formatTime = `${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분`;

    return formatTime;
} 
// 브라우저 표시
const currentTime = getTime();
console.log(currentTime);// 

const timeElement = document.getElementById("date"); // 화면에 표시할 요소의 ID 사용
timeElement.innerHTML = currentTime;

// icon 띄우기
/**
 * const weatherIconUrl = `http://openweathermap.org/img/wn/${WeatherResult.weather[0].icon}.png`;
const weatherDescription = WeatherResult.weather[0].description;

const imageElement = document.createElement("img");
imageElement.src = weatherIconUrl;
imageElement.alt = weatherDescription;

const seoulIconElement = document.querySelector('.icon');
seoulIconElement.appendChild(imageElement);

 */

// const render=()=>{
//     getWeatharHTML= dataList.map((item) =>{`
//     <div class="weather-box">
//     <div class="weather">${dataList.temp}</div>
//     <div class="time"></div>
//     <div class="date"></div>
//     <div class="icon"></div>
// </div>`
//     document.getElementById("weather-box").innerHTML = getWeatherHTML;
// }
// )};

getWeather();