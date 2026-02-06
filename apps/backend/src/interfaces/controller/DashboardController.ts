// src/interfaces/controller/DashboardController.ts
// Controller for handling dashboard-related requests, such as fetching the next booking and statistics about bookings

import { Request, Response } from "express";
import { GetDashboardUseCase } from "../../application/usecases/DashboardUseCases";


export class DashboardController {
    constructor(
        private getDashboardUseCase: GetDashboardUseCase
    ) { }

    getDashboard = async (_req: Request, res: Response) => {
        try {
            const dashboard = await this.getDashboardUseCase.execute();
            res.json(dashboard);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    };

}
