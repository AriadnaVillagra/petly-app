import { BookingRepository } from "../../../domain/repositories/BookingRepository";
import { Booking, Service } from "../../../domain/entities/Booking";
import { BookingModel } from "../models/BookingModel";

export class MongoBookingRepository implements BookingRepository {

  async create(booking: Booking): Promise<Booking> {
    await BookingModel.create({
      id: booking.id,
      petId: booking.petId,
      petName: booking.petName,
      petSize: booking.petSize,
      userId: booking.userId,
      service: {
        id: booking.service.id,
        name: booking.service.name,
        basePrice: booking.service.basePrice,
        type: booking.service.type,
      },
      date: booking.date,
      time: booking.time,
      durationMinutes: booking.durationMinutes,
      status: booking.status,
    });

    return booking;
  }

  async getById(id: string): Promise<Booking> {
    const doc = await BookingModel.findOne({ id });

    if (!doc) {
      throw new Error("Booking not found");
    }

    return this.mapToDomain(doc);
  }

  async update(booking: Booking): Promise<Booking> {
    await BookingModel.updateOne(
      { id: booking.id },
      {
        petId: booking.petId,
        petName: booking.petName,
        petSize: booking.petSize,
        userId: booking.userId,
        service: {
          id: booking.service.id,
          name: booking.service.name,
          basePrice: booking.service.basePrice,
          type: booking.service.type,
        },
        date: booking.date,
        time: booking.time,
        durationMinutes: booking.durationMinutes,
        status: booking.status,
      }
    );

    return booking;
  }

  async getAll(): Promise<Booking[]> {
    const docs = await BookingModel.find();
    return docs.map(doc => this.mapToDomain(doc));
  }

  async findByUser(userId: string): Promise<Booking[]> {
    const docs = await BookingModel.find({ userId });
    return docs.map(doc => this.mapToDomain(doc));
  }

  /* =========================
     Private mapper
  ========================= */

  private mapToDomain(doc: any): Booking {
    return new Booking(
      doc.id,
      doc.petId,
      doc.petName,
      doc.petSize,
      doc.userId,
      new Service(
        doc.service.id,
        doc.service.name,
        doc.service.basePrice,
        doc.service.type
      ),
      doc.date,
      doc.time,
      doc.durationMinutes,
      doc.status
    );
  }
}
