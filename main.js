// apiKey 를 넣는 변수
// 본인 apiKey 입력
const API_KEY = `1ad65336915d1716ae49cc7842fb0791`;

// 전역변수 
let nav_country = "";
let nav_city = "";
let nav_weather = "";
let nav_temp = "";

async function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  // url 주소를 넣는 변수
  const url = new URL(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  // url 호출
  const response = await fetch(url);
  const data = await response.json();
  console.log("data", data);

  // 위치 정보 출력
  nav_country = data.sys.country;
  nav_city = data.name;

  // 날씨 및 섭씨 기온 출력
  nav_weather = data.weather[0].main;
  nav_temp = data.main.temp;

  console.log(url);

  // displayCurrentDate 함수 호출
  // 호출 시 nav_weather와 nav_temp를 전달하여 사용
  displayCurrentDate(nav_weather, nav_temp, nav_country, nav_city);
}

function onGeoError() {
  alert("Cant't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// 현재 날짜를 가져오는 함수
function getCurrentDate() {
  const currentTime = new Date();
  //   console.log(currentTime);
  const options = {
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateStr = currentTime.toLocaleDateString("ko-KR", options).slice(0, 11);
  const timeStr = currentTime.toLocaleDateString("en-US", options).slice(-8);
  //   console.log("오늘 날짜",dateStr)
  //   console.log("현재 시간", timeStr);
  return [dateStr, timeStr];
}

// HTML 요소에 현재 날짜와 요일을 추가하는 함수
function displayCurrentDate(weather, temp, country, city) {
  const [date, time] = getCurrentDate();
  console.log(date, time);

  // HTML 요소 선택
  let todayTimeWeather = document.querySelector(".today-weather");
  let dateHTML = "";

  // 생성된 HTML을 화면에 추가
  dateHTML += `<div class="tw-area">
            <section class="tw-container">
                <div class="today">
                    <div class="time">${time}</div>
                    <div class="date">${date}</div>
                </div>
                <div class="wea-loc">
                    <div class="weather">${weather} ${temp}°C</div>
                    <div class="loc">
                        <i class="fa-solid fa-location-dot"></i>
                        ${country} ${city}
                    </div>
                </div>
            </section>
        </div>`;

  // todayTimeWeather 요소에 생성된 HTML 추가
  todayTimeWeather.innerHTML = dateHTML;

  console.log("Time:", time);
  console.log("Date:", date);
  console.log("Weather", weather);
  console.log("Temperature", temp);
}
