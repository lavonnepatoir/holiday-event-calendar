import React, { useState } from 'react';
import './App.css';
import events from './Events'; //separate file

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleFilterEvents = () => {
    const filtered = events.filter((event) => {
      const isWithinDateRange =
        (!startDate || new Date(event.date) >= new Date(startDate)) &&
        (!endDate || new Date(event.date) <= new Date(endDate));
      const isMatchingCategory =
        !selectedCategory || event.category === selectedCategory;

      return isWithinDateRange && isMatchingCategory;
    });
    setFilteredEvents(filtered);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Holiday Event Calendar</h1>
        <p>Select a date range and category to view events</p>
      </header>
      <div className="filter-container">
        <label>
          <span>Start Date:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
        </label>
        <label>
          <span>End Date:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
          />
        </label>
        <label>
          <span>Select Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All</option>
            <option value="food">Food</option>
            <option value="music">Music</option>
            <option value="social">Social</option>
            <option value="fitness">Fitness</option>
          </select>
        </label>
        <button className="filter-button" onClick={handleFilterEvents}>
          Filter Events
        </button>
      </div>
      <div className="events-container">
        <h2>Filtered Events</h2>
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event, index) => (
              <ul key={index} className="event-item">
                <strong>{event.name}</strong> - {event.date} ({event.category})
              </ul>
            ))}
          </ul>
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}

export default App;
