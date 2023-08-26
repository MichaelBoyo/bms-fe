export type CreateServiceRequest = {
    name: string;
    description: string;
    imageUrl: string;
}

export type CreateServiceResponse = {
    status: number;
    data: {
        message: string;
        ok: boolean;
        status: string;
        [key: string]: any; // If there are any other properties, they can be of any type
    };
}

export type User = {
    name: string;
    email: string;
    phoneNumber: string;
    bookingDate: string
    additionalDetails?: string;
};

export type Service = {
    name: string;
    description: string;
    imageUrl: string;
    users: User[]
}

export type GetServicesRequest = {
    page: number;
    size: number;
}

export type GetBookedServicesRequest = {
    userEmail: string
    page: number;
    size: number;
}

export type GetServicesResponse = {
    content: {
        bookings: {
            bookingDate: number[];
            bookingId: string;
            bookingStatus: string;
            userEmail: string;
        }[];
        length: number;
        businessId: string;
        description: string;
        imageUrl: string;
        name: string;
        serviceId: string;
    }[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
}

export type GetBookedServicesResponse = {
    content: {
        bookingDate: number[];
        bookingId: string;
        bookingStatus: string;
        serviceOffering: null;
        userEmail: string;
    }[];
    empty: false;
    first: true;
    last: true;
    number: number;
    numberOfElements: number;
    pageable: {
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: true;
    };
    size: number;
    sort: {
        empty: true;
        sorted: false;
        unsorted: true;
    };
    totalElements: number;
    totalPages: number;
}

export type BookServiceRequest = {
    serviceId: string;
}

export type BookingActionRequest = {
    serviceId: string;
    userEmail: string
}