const base = {
    endpoints: {
        allEvent: '/api-event/event',
        newEvent: '/api-event/event/new',
        allBooking: '/api-event/booking',
        newBooking: '/api-event/booking/new',
        findBooking: '/api-event/booking/find',
        cancelBooking: '/api-event/booking/cancel',
        updateBooking: '/api-event/update',
        eventCapacityCheck: '/api-event/booking/capacity-check',
    },
};
const development = {
    ...base,
    backendBaseUrl: 'http://server.minhaj.se/admin-be',
};

const production = {
    ...base,
    backendBaseUrl: 'http://server.minhaj.se/admin-be',
};

const config = process.env.NODE_ENV === 'development' ? development : production;

export { config };
