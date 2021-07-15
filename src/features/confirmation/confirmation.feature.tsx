import React, { FC } from 'react';
type ConfirmationProps = {
    bookingId: string;
    eventTime?: string;
    eventDate?: string;
};

const ConfirmationFeature: FC<ConfirmationProps> = ({ bookingId, eventDate }) => {
    return (
        <div>
            <h2>Booking Confirmation</h2>
            <div>
                <h3>Your booking details</h3>
                <p>Event Date: {eventDate}</p>
                <p>Booking Number: {bookingId}</p>
                <p>
                    An email has also been sent to the email address provided with the booking
                    details.
                </p>
            </div>
        </div>
    );
};

export { ConfirmationFeature };
