import { Admission } from 'src/domain/entities/Admission';
import { AdmissionRepository } from '../ports/AdmissionRepository';

type CreateAdmissionInput = {
  patientId: string;
  admitedAt: Date;
};

export class CreateAdmissionUseCase {
  constructor(private readonly admissionRepository: AdmissionRepository) {}

  async execute(input: CreateAdmissionInput): Promise<Admission> {
    const activeAdmission =
      await this.admissionRepository.findActiveByPatientId(input.patientId);
    if (activeAdmission) {
      throw new Error('Paciente já possui internação ativa');
    }

    const admission = new Admission({
      id: crypto.randomUUID(),
      patientId: input.patientId,
      status: 'ACTIVE',
      admittedAt: input.admitedAt,
      dischargedAt: null,
    });

    await this.admissionRepository.save(admission);

    return admission;
  }
}
