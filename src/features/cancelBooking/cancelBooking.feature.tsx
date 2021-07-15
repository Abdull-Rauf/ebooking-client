import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MenuItem } from '@material-ui/core';
import { cancelBookingService } from '../../services/booking.service';
import { EventType } from 'types';

type BookingProps = {
    events: EventType[];
};
const CancelBookingFeature: FC<BookingProps> = ({ events }) => {
    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState<any>({
        email: '',
        eventId: '',
    });
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState({
        isError: false,
        errorText: '',
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleOnChange = (evt: any) => {
        const value = evt.target.value;
        setFields({
            ...fields,
            [evt.target.name]: value,
        });
    };

    const submitForm = (e: any) => {
        e.preventDefault();
        setFields({ ...fields });
        cancelBookingService(fields)
            .then((res: any) => {
                if (res.isSuccess) {
                    setIsCancelled(true);
                    return res;
                }
                error.isError = true;
                error.errorText =
                    'Either you have no booking in the selected Event or you have given the wrong email.';
                setError({ ...error });
                return res;
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Cancel Booking
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick
            >
                <DialogTitle id="form-dialog-title">Cancel Booking</DialogTitle>
                {!isCancelled ? (
                    <form onSubmit={submitForm}>
                        <DialogContent>
                            <DialogContentText>
                                To cancel your booking please enter your email address and event
                                that you have registered for.
                            </DialogContentText>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleOnChange}
                                autoComplete="email"
                                type="email"
                                error={error.isError}
                                helperText={error.errorText}
                            />
                            <TextField
                                id="standard-select-currency-native"
                                select
                                fullWidth
                                required
                                value={fields.eventId}
                                onChange={handleOnChange}
                                name="eventId"
                                label="Select An Event"
                                variant="outlined"
                                helperText="Select the event time you want to attend"
                            >
                                {events.map((e) => (
                                    <MenuItem key={e.event_id} value={e.event_id}>
                                        {`${e.event_name} (${e.event_time})`}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Back
                            </Button>
                            <Button type="submit" color="secondary">
                                Cancel Booking
                            </Button>
                        </DialogActions>
                    </form>
                ) : (
                    <DialogContent>
                        <h2>Your booking has been cancelled on your request.</h2>
                        <Button onClick={handleClose}>Back</Button>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
};
export { CancelBookingFeature };
