import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { fetchEvents, createEvent, updateEvent, deleteEvent, formatDate } from '../../utils/calendar';

Modal.setAppElement('#root');

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarView, setCalendarView] = useState('dayGridMonth'); // Default view

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const fetchedEvents = await fetchEvents();
    const formattedEvents = fetchedEvents.map(event => ({
      ...event,
      start: event.start_time,
      end: event.end_time
    }));
    setEvents(formattedEvents);
  };

  const handleDateClick = (arg) => {
    setSelectedEvent({ id: null, name: '', start: arg.date, end: arg.date });
    setModalIsOpen(true);
  };

  const handleEventClick = ({ event }) => {
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.extendedProps.description,
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eventData = {
      title: formData.get('title'),
      start_time: formData.get('start'),
      end_time: formData.get('end'),
    };
    if (selectedEvent && selectedEvent.id) {
      await updateEvent(selectedEvent.id, eventData);
    } else {
      await createEvent(eventData);
    }
    loadEvents();
    closeModal();
  };

  return (
    <div className='calendar-content' style={{ color: '#dcbf53', backgroundColor: '#222' }}>
      <div className="toolbar">
        <button onClick={() => setModalIsOpen(true)}>Add Event</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={calendarView}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridDay,timeGridWeek,dayGridMonth'
        }}
        themeSystem='bootstrap'
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
        style={{
          content: {
            color: 'black',
            background: 'gold'
          }
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Event Title:</label>
          <input id="title" name="title" type="text" defaultValue={selectedEvent?.title || ''} required />
          
          <label htmlFor="start">Start Date:</label>
          <input id="start" name="start" type="date" defaultValue={selectedEvent ? formatDate(selectedEvent.start) : ''} required />
          
          <label htmlFor="end">End Date:</label>
          <input id="end" name="end" type="date" defaultValue={selectedEvent ? formatDate(selectedEvent.end) : ''} required />

          {selectedEvent?.id ? (
            <>
              <button type="submit">Update Event</button>
              <button type="button" onClick={() => deleteEvent(selectedEvent.id)}>Delete Event</button>
            </>
          ) : (
            <button type="submit">Create Event</button>
          )}
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
