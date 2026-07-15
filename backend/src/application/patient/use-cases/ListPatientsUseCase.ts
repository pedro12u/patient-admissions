import { Patient } from 'src/domain/entities/Patient';
import { PatientRepository } from '../ports/PatientRepository';

export class ListPatientsUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(): Promise<Patient[]> {
    return this.patientRepository.findAll();
  }
}
