import { Patient } from 'src/domain/entities/Patient';
import { PatientRepository } from '../ports/PatientRepository';

export class FindPatientByIdUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new Error('Paciente não encontrado');
    }

    return patient;
  }
}
