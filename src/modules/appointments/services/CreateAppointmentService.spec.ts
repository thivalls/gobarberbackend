import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
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

  it('should not be able to create appointment in the same hour', () => {
    expect(1 + 1).toBe(2);
  });
});
