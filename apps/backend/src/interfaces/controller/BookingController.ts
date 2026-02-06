// src/interfaces/controller/BookingController.ts
// Controller for handling HTTP requests related to bookings, interacts with the use cases to perform operations and sends appropriate responses

import { Request, Response } from "express";
import {
    CreateBookingUseCase,
    ListBookingsUseCase,
    GetBookingByIdUseCase,
    UpdateBookingStatusUseCase,
    DeleteBookingUseCase,
} from "../../application/usecases/BookingUsecases";

const MOCK_USER_ID = "mock-user-123"; // En un caso real, este ID vendría del middleware de autenticación después de verificar el token del usuario

export class BookingController {
    constructor(
        private createBooking: CreateBookingUseCase,
        private getAllBookings: ListBookingsUseCase,
        private getBookingById: GetBookingByIdUseCase,
        private updateBookingStatus: UpdateBookingStatusUseCase,
        private deleteBooking: DeleteBookingUseCase
    ) { }

    create = async (req: Request, res: Response) => {
        try {
            const userId = MOCK_USER_ID;
            const petId = req.body.petId;

            const booking = await this.createBooking.execute(
                req.body,
                userId,
                petId,
                req.body.serviceType
            );

            res.status(201).json(booking);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });

        }
    };

    getAll = async (_req: Request, res: Response) => {
        try {
            const bookings = await this.getAllBookings.execute();
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const booking = await this.getBookingById.execute(req.params.bookingId);
            if (booking) {
                res.json(booking);
            } else {
                res.status(404).json({ message: "Booking not found" });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
            const booking = await this.updateBookingStatus.execute(
                req.params.bookingId,
                req.body.status
            );
            res.json(booking);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.deleteBooking.execute(req.params.bookingId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}