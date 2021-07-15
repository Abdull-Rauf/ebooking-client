import { config } from 'config';
import { getAxiosInstance } from './getAxiosInstance.service';

const {
    backendBaseUrl,
    endpoints: { allEvent },
} = config;

const getAllEventService = async (): Promise<ResponseType> => {
    const axios = getAxiosInstance();
    try {
        const response = await axios.get(backendBaseUrl + allEvent);
        return response.data;
    } catch (error) {
        return error;
    }
};

export { getAllEventService };
