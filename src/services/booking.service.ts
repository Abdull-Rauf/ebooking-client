import { config } from 'config';
import { getAxiosInstance } from './getAxiosInstance.service';

const {
    backendBaseUrl,
    endpoints: {
        allBooking,
        newBooking,
        findBooking,
        cancelBooking,
        eventCapacityCheck,
        updateBooking,
    },
} = config;

const getAllBookingService = async (): Promise<ResponseType> => {
    const axios = getAxiosInstance();
    try {
        const response = await axios.get(backendBaseUrl + allBooking);
        return response.data;
    } catch (error) {
        return error;
    }
};

const insertNewBookingService = async (payload: { [key: string]: any }): Promise<ResponseType> => {
    const axios = getAxiosInstance();
    try {
        const response = await axios.post(backendBaseUrl + newBooking, payload);
        return response.data;
    } catch (error) {
        return error;
    }
};

const findBookingService = async (payload: { [key: string]: any }): Promise<ResponseType> => {
    const axios = getAxiosInstance();
    try {
        const response = await axios.post(backendBaseUrl + findBooking, payload);
        return response.data;
    } catch (error) {
        return error;
    }
};

const updateBookingService = async (payload: { [key: string]: any }): Promise<ResponseType> => {
    const axios = getAxiosInstance();
    try {
        const response = await axios.post(backendBaseUrl + updateBooking, payload);
        return response.data;
    } catch (error) {
        return error;
    }
};

const cancelBookingService = async (payload: { [key: string]: any }): Promise<ResponseType> => {
    const axios = getAxiosInstance();
    try {
        const response = await axios.post(backendBaseUrl + cancelBooking, payload);
        return response.data;
    } catch (error) {
        return error;
    }
};

const eventCapacityCheckService = async (eventId: number): Promise<ResponseType> => {
    const axios = getAxiosInstance();
    try {
        const response = await axios.post(backendBaseUrl + eventCapacityCheck, { eventId });
        return response.data;
    } catch (error) {
        return error;
    }
};

export {
    getAllBookingService,
    insertNewBookingService,
    findBookingService,
    cancelBookingService,
    eventCapacityCheckService,
    updateBookingService,
};
