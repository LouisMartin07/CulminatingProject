import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../utils/calendar';

Modal.setAppElement('#root');

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [calendarView, setCalendarView] = useState('dayGridMonth');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const fetchedEvents = await fetchEvents();
    setEvents(fetchedEvents.map(event => ({
      ...event,
      start: event.start_time,
      end: event.end_time
    })));
  };

  const handleDateClick = (arg) => {
    setSelectedEvent({ id: null, title: '', start: arg.date, end: arg.date });
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
      const updated = await updateEvent(selectedEvent.id, eventData);
      if (updated) loadEvents();  // Reload events after successful update
    } else {
      const created = await createEvent(eventData);
      if (created) loadEvents();  // Reload events after successful creation
    }
    closeModal();
  };

  const handleDeleteEvent = async (eventId) => {
    const deleted = await deleteEvent(eventId);
    if (deleted) loadEvents();  // Reload events after successful deletion
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
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1050 // Ensure this is high enough or the modal wont work
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            padding: '20px'
          }
        }}
      >
        <form onSubmit={handleFormSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label htmlFor="title">Event Title:</label>
            <input id="title" name="title" type="text" defaultValue={selectedEvent?.title || ''} required />
          </div>
          <div>
            <label htmlFor="start">Start Date:</label>
            <input id="start" name="start" type="date" defaultValue={selectedEvent ?(selectedEvent.start) : ''} required />
          </div>
          <div>
            <label htmlFor="end">End Date:</label>
            <input id="end" name="end" type="date" defaultValue={selectedEvent ?(selectedEvent.end) : ''} required />
          </div>
          <div>
            {selectedEvent?.id ? (
              <>
                <button type="submit">Update Event</button>
                <button type="button" onClick={() => handleDeleteEvent(selectedEvent.id)}>Delete Event</button>

              </>
            ) : (
              <button type="submit">Create Event</button>
            )}
          </div>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default CalendarComponent;
