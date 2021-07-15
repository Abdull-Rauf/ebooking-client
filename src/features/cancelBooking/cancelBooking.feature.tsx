import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { cancelBookingService } from '../../services/booking.service';
import Snackbar from '@material-ui/core/Snackbar';

const CancelBookingFeature = () => {
    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState<any>({
        email: '',
    });
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState({
        isError: false,
        errortext: '',
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
                error.errortext = "This email doesn't exist in our system.";
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
                                To cancel your Friday Prayer Reservation please enter your email
                                given by registeration time
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
                                helperText={error.errortext}
                            />
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
