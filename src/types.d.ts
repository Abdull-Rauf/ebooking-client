declare module 'types' {
    export type Product = {
        name: string;
        color?: string;
        size?: number;
        isDiscount?: boolean;
    };

    export type EventType = {
        event_id: number;
        event_name: string;
        event_date: string;
        event_time: string;
        event_category: string;
    };
    export type LocalStorageDataType = {
        key?: any;
        value?: any;
    };
}
