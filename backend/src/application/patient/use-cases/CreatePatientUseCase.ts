import { Patient } from 'src/domain/entities/Patient';
import { PatientRepository } from '../ports/PatientRepository';

type CreatePatientInput = {
  fullName: string;
  sex: 'M' | 'F' | 'O';
  birthDate: Date;
  city: string;
};

export class CreatePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: CreatePatientInput): Promise<Patient> {
    const patient = new Patient({
      id: crypto.randomUUID(),
      fullName: input.fullName,
      sex: input.sex,
      birthDate: input.birthDate,
      city: input.city,
    });

    await this.patientRepository.save(patient);

    return patient;
  }
}
