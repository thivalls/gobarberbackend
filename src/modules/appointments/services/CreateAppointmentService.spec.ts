import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentRepository = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointmentRepository.execute({
      date: new Date(),
      provider_id: '3456321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('3456321');
  });

  it('should not be able to create appointment in the same hour', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentRepository = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentTestDate = new Date(2020, 4, 10, 11);

    await createAppointmentRepository.execute({
      date: appointmentTestDate,
      provider_id: '3456321',
    });

    expect(
      createAppointmentRepository.execute({
        date: appointmentTestDate,
        provider_id: '3456321',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentRepository.execute({
        date: appointmentTestDate,
        provider_id: '3456321',
      }),
    ).rejects.toEqual({
      message: 'This date is already booked',
      statusCode: 400,
    });
  });
});
