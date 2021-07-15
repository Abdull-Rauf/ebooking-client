import React, { useEffect, useState } from 'react';
import './App.style.scss';
import { BookingFeature } from 'features/booking/';
import { LoaderFeature } from 'features/loader';

import { getAllEventService } from 'services/event.service';

const App = () => {
    const [events, setEvents] = useState<any[]>([]);
    useEffect(() => {
        getAllEventService()
            .then((res: any) => setEvents(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="App">
            {events.length > 0 ? <BookingFeature events={events} /> : <LoaderFeature />}
        </div>
    );
};

export default App;
