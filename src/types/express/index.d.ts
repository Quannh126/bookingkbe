declare namespace Express {
    interface Request {
        user: {
            id: string;
            role: string;
        };
        query: {
            keyword?: string;
            dropoff: string;
            pickup: string;
            journeydate: string;
            route: string;
        };
    }
}
