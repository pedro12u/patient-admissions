import { Patient } from 'src/domain/entities/Patient';
import { PatientRepository } from '../ports/PatientRepository';

type UpdatePatientInput = {
  id: string;
  fullName?: string;
  sex?: 'M' | 'F' | 'O';
  birthDate?: Date;
  city?: string;
};

export class UpdatePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: UpdatePatientInput): Promise<Patient> {
    const existing = await this.patientRepository.findById(input.id);

    if (!existing) {
      throw new Error('Paciente não encontrado');
    }

    const updated = existing.update({
      fullName: input.fullName,
      sex: input.sex,
      birthDate: input.birthDate,
      city: input.city,
    });

    await this.patientRepository.save(updated);

    return updated;
  }
}
