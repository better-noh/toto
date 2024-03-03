// 로고 이미지
let totoBtn = document.querySelector('.toto_img');

totoBtn.addEventListener('click', function () {
  window.location.href = "../index.html";
});

// 사이드바 메모 
let SideMoveMemo = document.querySelector('.dropdown-item');

SideMoveMemo.addEventListener('click', function(){
    window.location.href = "../StickyNotes/index2.html";
});

// 날씨 정보 담을 변수
const weather = document.querySelector("#weather span:first-child");

// apiKey 를 넣는 변수
const API_KEY = `e9c783dd8bf47188787fdb34e77b61c7`;

// 전역변수 
let nav_country = "";
let nav_city = "";
let nav_weather = "";
let nav_temp = "";
// 캘린더 전역변수
let calendar;
let selectedDate = null;

async function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  // url 주소를 넣는 변수
  const url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

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

  // 아이콘 
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  weather.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">${nav_weather} / ${nav_temp}°C`;

  console.log(url);

  // displayCurrentDate 함수 호출
  // 호출 시 nav_weather와 nav_temp를 전달하여 사용
  displayCurrentDate(nav_weather, nav_temp, nav_country, nav_city, iconUrl);
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
function displayCurrentDate(weather, temp, country, city, iconUrl) {
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
                  <div class="weather">
                  <img src="${iconUrl}" alt="Weather Icon"> ${temp}°C</div>
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
//   console.log(weather.icon);
}

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [],
        select: function(info) {
            selectedDate = info.startStr; // 선택한 날짜 저장
            $('#memoModal').modal('toggle'); // 모달 표시
        }
    });
    calendar.render();

    document.getElementById('memoForm').addEventListener('submit', function(e) {
        e.preventDefault(); // 폼 기본 제출 동작 방지
        let eventTitle = document.getElementById('memoText').value.trim();

        if(eventTitle) { // 제목이 비어있지 않은 경우에만 이벤트 추가
            addEventToCalendar({
                title: eventTitle,
                start: selectedDate,
                color: '#8b008b'
            });
        }

        $('#memoModal').modal('hide'); // 모달 숨기기
        document.getElementById('memoForm').reset(); // 폼 내용 초기화
    });
});

function addEventToCalendar(event){
    calendar.addEvent(event);
}

