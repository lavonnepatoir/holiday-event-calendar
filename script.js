// 1. Static Event Data
// In a full application, this data would be fetched from an API or database.
const HOLIDAY_EVENTS = [
    { name: "Clermont Holiday Parade", date: "2024-12-07", category: "social" },
    { name: "Winter Market Day", date: "2024-12-14", category: "market" },
    { name: "Family Movie Night: Elf", date: "2024-12-16", category: "family" },
    { name: "Local Craft Fair", date: "2024-12-21", category: "market" },
    { name: "New Year's Eve Gala", date: "2024-12-31", category: "social" },
    { name: "Gingerbread House Workshop", date: "2024-12-10", category: "family" },
    { name: "Tree Lighting Ceremony", date: "2024-12-01", category: "social" },
];

// 2. DOM Element Selectors
const filterForm = document.getElementById('filterForm');
const eventListContainer = document.getElementById('eventList');

/**
 * Renders the list of events into the eventListContainer.
 * @param {Array} events - The array of event objects to display.
 */
function renderEvents(events) {
    eventListContainer.innerHTML = ''; // Clear previous results

    if (events.length === 0) {
        eventListContainer.innerHTML = '<p class="no-events">No events found for the selected criteria.</p>';
        return;
    }

    events.forEach(event => {
        const eventDateFormatted = new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        // Example format: CLERMONT Holiday Parade - 2024-12-07 (social)
        eventItem.textContent = `${event.name.toUpperCase()} - ${eventDateFormatted} (${event.category})`;
        
        eventListContainer.appendChild(eventItem);
    });
}

/**
 * Filters the HOLIDAY_EVENTS array based on the form inputs.
 * @param {Event} e - The form submission event.
 */
function filterEvents(e) {
    e.preventDefault(); // Stop the form from submitting and reloading the page

    // Get input values from the form
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    const selectedCategory = document.getElementById('category').value;

    // Use a Date object for reliable date comparisons
    const startTimestamp = startDateInput ? new Date(startDateInput).getTime() : 0;
    // Set End Date to the end of the day (23:59:59) for an inclusive search
    const endTimestamp = endDateInput ? new Date(endDateInput).setHours(23, 59, 59, 999) : Infinity;

    // 1. Filter by Date Range
    let filteredByDate = HOLIDAY_EVENTS.filter(event => {
        const eventTimestamp = new Date(event.date).getTime();
        return eventTimestamp >= startTimestamp && eventTimestamp <= endTimestamp;
    });

    // 2. Filter by Category
    let finalFilteredEvents = filteredByDate.filter(event => {
        // 'ALL' category shows everything, otherwise check for a match
        return selectedCategory === 'ALL' || event.category === selectedCategory.toLowerCase();
    });

    // 3. Sort Events by Date
    finalFilteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // 4. Display the results
    renderEvents(finalFilteredEvents);
}

// 4. Attach Event Listener to the Form
filterForm.addEventListener('submit', filterEvents);

// 5. Initial Load: Display all events when the page first loads
// This ensures the "Filtered Events" section is not empty
document.addEventListener('DOMContentLoaded', () => {
    // We sort the original array for a clean initial display
    const initialEvents = [...HOLIDAY_EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));
    renderEvents(initialEvents);
});