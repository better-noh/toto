let calendar;
let selectedDate = null;

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [],
        dateClick: function(info) {
            selectedDate = info.dateStr; // 선택한 날짜 저장
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