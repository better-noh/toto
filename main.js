let calendar;

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        events: [],

        dateClick: function (event) {
            // console.log("click!", event.dateStr)
            addEventToCalendar({title:"MEMO",  start:event.dateStr });
            // removeEventFromCalendar(event.dateStr);
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