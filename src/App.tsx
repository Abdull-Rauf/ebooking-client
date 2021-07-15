import React, { useEffect, useState } from 'react';
import './App.style.scss';
import { BookingFeature } from 'features/booking/';
import { TestFeature } from 'features/example/';

import { getAllEventService } from 'services/event.service';

const App = () => {
    const [events, setEvents] = useState<any[]>([]);
    useEffect(() => {
        getAllEventService()
            .then((res: any) => setEvents(res))
            .catch((err) => console.log(err));
    }, []);
    // const date = new Date();
    // const today = date.getDay();
    // const show = today > 1 && today < 6 ? true : false;
    return (
        <div className="App">
            {events.length > 0 ? <BookingFeature events={events} /> : <TestFeature />}
        </div>
    );
};

export default App;
