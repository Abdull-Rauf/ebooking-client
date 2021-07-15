import React, { FC } from 'react';
import QRCode from 'qrcode.react';
import { config } from 'config';
type ConfirmationProps = {
    bookingId: string;
    eventTime?: string;
    eventDate?: string;
};
const {
    backendBaseUrl,
    endpoints: { updateBooking },
} = config;

const ConfirmationFeature: FC<ConfirmationProps> = ({ bookingId, eventDate }) => {
    const qrValue = `${backendBaseUrl + updateBooking}?status=attended&bookingId=${bookingId}`;
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
            <div>
                <QRCode value={qrValue} />
            </div>
        </div>
    );
};

export { ConfirmationFeature };
