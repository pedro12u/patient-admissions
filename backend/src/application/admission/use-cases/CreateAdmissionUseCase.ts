import { Admission } from 'src/domain/entities/Admission';
import { PatientRepository } from 'src/application/patient/ports/PatientRepository';
import { AdmissionRepository } from '../ports/AdmissionRepository';

type CreateAdmissionInput = {
  patientId: string;
  admitedAt: Date;
};

export class CreateAdmissionUseCase {
  constructor(
    private readonly admissionRepository: AdmissionRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute(input: CreateAdmissionInput): Promise<Admission> {
    const patientExists = await this.patientRepository.existsById(
      input.patientId,
    );
    if (!patientExists) {
      throw new Error('Paciente não encontrado');
    }

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
