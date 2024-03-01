// const todo = document.querySelector();

let calendar;

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [],

        dateClick: function (e) {
            let eventTitle = prompt("Enter event title:");
            if(eventTitle===null || eventTitle===""){ return }
            addEventToCalendar({ title:eventTitle, start:e.dateStr, color:'#8b008b' });
            // removeEventFromCalendar(e.dateStr);
        }

    });
    calendar.render();
});


function addEventToCalendar(event){
    calendar.addEvent(event);
}

function removeEventFromCalendar(id){
    let calendarEvent = calendar.getEventById(id);
    calendarEvent.remove();
}

