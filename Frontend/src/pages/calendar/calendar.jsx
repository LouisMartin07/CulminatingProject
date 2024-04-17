import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { fetchEvents, createEvent, updateEvent, deleteEvent, formatDate } from '../../utils/calendar';

Modal.setAppElement('#root'); // Necessary for screen readers

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const fetchedEvents = await fetchEvents();
    const formattedEvents = fetchedEvents.map(event => ({
      ...event,
      start: event.start_time, // Rename start_time to start
      end: event.end_time     // Rename end_time to end
    }));
    setEvents(formattedEvents);
    console.log("Formatted events:", formattedEvents); // Verify the formatted events
  };

  const handleDateClick = (arg) => {
    // Set default properties for a new event
    setSelectedEvent({ id: null, name: '', start: arg.date, end: arg.date });
    setModalIsOpen(true);
  };

  const handleEventClick = ({ event }) => {
    // Load the event details into the selectedEvent state
    setSelectedEvent({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        description: event.extendedProps.description,
        // Include other properties as needed
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
   console.log('Event data being sent:', eventData);
   if (!eventData.title) {
     console.error('Title is missing!');
   }
    // Check if selectedEvent is not null and has an id property
    if (selectedEvent && selectedEvent.id) {
      await updateEvent(selectedEvent.id, eventData);
    } else {
      await createEvent(eventData);
    }
    loadEvents();
    closeModal();
  };

  return (
    <div className='calendar-content'>
      <button onClick={() => setModalIsOpen(true)}>Add Event</button> {/* Visible button for adding events */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
      >
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Event Title:</label>
          <input id="title" name="title" type="text" defaultValue={selectedEvent?.title || ''} required />
          
          <label htmlFor="start">Start Date:</label>
          <input 
            id="start" 
            name="start" 
            type="date" 
            defaultValue={selectedEvent ? formatDate(selectedEvent.start) : ''} 
            required 
          />
          
          <label htmlFor="end">End Date:</label>
          <input 
            id="end" 
            name="end" 
            type="date" 
            defaultValue={selectedEvent ? formatDate(selectedEvent.end) : ''} 
            required 
          />

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
