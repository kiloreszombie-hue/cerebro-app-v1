// calendar.js

class Calendar {
    constructor() {
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
    }

    deleteEvent(eventId) {
        this.events = this.events.filter(event => event.id !== eventId);
    }

    getEvents() {
        return this.events;
    }

    getEventsByDate(date) {
        return this.events.filter(event => event.date === date);
    }
}

// Example usage:
const calendar = new Calendar();
calendar.addEvent({ id: 1, date: '2026-03-02', name: 'Meeting' });
console.log(calendar.getEventsByDate('2026-03-02'));