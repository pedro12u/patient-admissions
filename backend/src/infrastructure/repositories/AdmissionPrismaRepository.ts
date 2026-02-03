import { AdmissionRepository } from '../../application/admission/ports/AdmissionRepository';
import { Admission } from '../../domain/entities/Admission';
import { PrismaService } from '../prisma/PrismaService';

export class AdmissionPrismaRepository implements AdmissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveByPatientId(patientId: string): Promise<Admission | null> {
    const result = await this.prisma.$queryRaw<
      {
        id: string;
        patient_id: string;
        status: 'ACTIVE' | 'DISCHARGED' | 'CANCELED';
        admitted_at: Date;
        discharged_at: Date | null;
      }[]
    >`
      SELECT
        id,
        patient_id,
        status,
        admitted_at,
        discharged_at
      FROM admissions
      WHERE patient_id = ${patientId}
        AND status = 'ACTIVE'
      LIMIT 1
    `;

    if (result.length === 0) {
      return null;
    }

    const row = result[0];

    return new Admission({
      id: row.id,
      patientId: row.patient_id,
      status: row.status,
      admittedAt: row.admitted_at,
      dischargedAt: row.discharged_at,
    });
  }

  async save(admission: Admission): Promise<void> {
    await this.prisma.admission.create({
      data: {
        id: admission.id,
        patientId: admission.patientId,
        status: admission.status,
        admittedAt: admission.admittedAt,
        dischargedAt: admission.dischargedAt,
      },
    });
  }
}
