import React, { FC, useEffect, useState, MouseEventHandler } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { MenuItem, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { getAllBookingService, insertNewBookingService } from 'services/booking.service';
import { EventType } from 'types';
import { ConfirmationFeature } from 'features/confirmation/confirmation.feature';
import { CancelBookingFeature } from '../../features/cancelBooking';
import Logo from '../../assets/logo-small.png';

type BookingProps = {
    events: EventType[];
};
interface Click {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="www.minhaj.se">
                MQI MALMÖ
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '70%', // Fix IE 11 issue.
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const BookingFeature: FC<BookingProps & Click> = ({ events }) => {
    const classes = useStyles();
    const Alert = (props: any) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    };
    const [formSubmission, setFormSubmission] = useState<any>({
        isSuccess: 'failed',
        message: '',
        showToast: false,
        bookingId: '',
    });
    const [isChecked, setIsChecked] = useState(false);
    const [capacity, setCapacity] = useState<any[]>([]);
    const [fields, setFields] = useState<any>({
        fullName: '',
        mobNo: '',
        email: '',
        eventId: 0,
        status: 'Booked',
        eventTime: '1',
        eventDate: '1',
    });

    const setDateTimeCategory = (time: any, date: any, category: any) => {
        fields.eventDate = date;
        fields.eventTime = time;
        fields.eventCategory = category;

        return fields;
    };
    const handleOnChange = (evt: any) => {
        const value = evt.target.value;
        setFields({
            ...fields,
            [evt.target.name]: value,
        });
    };
    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const submitForm = (e: any) => {
        e.preventDefault();
        setFields({ ...fields });
        insertNewBookingService(fields)
            .then((res: any) => {
                formSubmission.isSuccess = res?.isSuccess !== 'failed' ? 'success' : res?.isSuccess;
                formSubmission.message = res?.message;
                formSubmission.showToast = true;
                formSubmission.bookingId = res?.bookingId;
                setFormSubmission({ ...formSubmission });
                return res;
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllBookingService()
            .then((res: any) => setCapacity(res))
            .catch((err) => console.log(err));
    }, []);

    const totalSeatsLeft = (eventId: any) => {
        const cap = capacity.length > 0 ? capacity.filter((x) => x.event_id === eventId && x) : [];
        return 75 - cap.length;
    };

    const handleOnClose = () => {
        formSubmission.isSuccess = '';
        formSubmission.message = '';
        formSubmission.showToast = false;
        setFormSubmission({ ...formSubmission });
    };
    if (formSubmission.isSuccess === 'success') {
        return (
            <ConfirmationFeature
                bookingId={`MQI-${fields.eventId}/${formSubmission.bookingId}`}
                eventTime={fields.eventTime}
                eventDate={fields.eventDate}
            />
        );
    }
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <img src={Logo} height="75px" alt="logo" />
                <h2>Minhaj Event Registration</h2>
                <form className={classes.form} onSubmit={submitForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-select-currency-native"
                                select
                                fullWidth
                                required
                                value={fields.event_id}
                                onChange={handleOnChange}
                                name="eventId"
                                label="Select An Event"
                                variant="outlined"
                                helperText="Select the event time you want to attend"
                            >
                                {events.map((e) => (
                                    <MenuItem
                                        onClick={() =>
                                            setDateTimeCategory(
                                                e.event_time,
                                                e.event_date,
                                                e.event_category
                                            )
                                        }
                                        key={e.event_id}
                                        value={e.event_id}
                                        disabled={totalSeatsLeft(e.event_id) < 1 ? true : false}
                                    >
                                        {totalSeatsLeft(e.event_id) < 1
                                            ? `${e.event_name} (${e.event_time}) Fully booked`
                                            : `${e.event_name} (${e.event_time}) ${totalSeatsLeft(
                                                  e.event_id
                                              )} seats left`}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="fullName"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="mobileNumber"
                                label="Mobile Number"
                                name="mobNo"
                                autoComplete="phone number"
                                onChange={handleOnChange}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                                helperText="* You must enter a valid email address. An email will be sent with the booking details "
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        required
                                        color="primary"
                                        onChange={handleCheckbox}
                                    />
                                }
                                label="I hereby confirm that I don't have any covid-19 symptoms."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={fields.eventId > 0 && isChecked ? false : true}
                    >
                        Submit
                    </Button>
                </form>
                <CancelBookingFeature />

                <Snackbar
                    open={formSubmission.showToast}
                    autoHideDuration={8000}
                    onClose={handleOnClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleOnClose} severity="error">
                        {formSubmission.message}
                    </Alert>
                </Snackbar>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export { BookingFeature };
