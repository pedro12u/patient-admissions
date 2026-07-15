import { PatientRepository } from '../../application/patient/ports/PatientRepository';
import { Patient } from '../../domain/entities/Patient';
import { PrismaService } from '../prisma/PrismaService';

type PatientRow = {
  id: string;
  fullName: string;
  sex: 'M' | 'F' | 'O';
  birthDate: Date;
  city: string;
};

export class PatientPrismaRepository implements PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Patient | null> {
    const result = await this.prisma.$queryRaw<PatientRow[]>`
      SELECT
        id,
        "fullName",
        sex,
        "birthDate",
        city
      FROM patients
      WHERE id = ${id}
      LIMIT 1
    `;

    if (result.length === 0) {
      return null;
    }

    return this.toDomain(result[0]);
  }

  async findAll(): Promise<Patient[]> {
    const result = await this.prisma.$queryRaw<PatientRow[]>`
      SELECT
        id,
        "fullName",
        sex,
        "birthDate",
        city
      FROM patients
      ORDER BY "fullName" ASC
    `;

    return result.map((row) => this.toDomain(row));
  }

  async existsById(id: string): Promise<boolean> {
    const result = await this.prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT EXISTS(SELECT 1 FROM patients WHERE id = ${id}) AS exists
    `;

    return result[0]?.exists ?? false;
  }

  async save(patient: Patient): Promise<void> {
    await this.prisma.patient.upsert({
      where: { id: patient.id },
      create: {
        id: patient.id,
        fullName: patient.fullName,
        sex: patient.sex,
        birthDate: patient.birthDate,
        city: patient.city,
      },
      update: {
        fullName: patient.fullName,
        sex: patient.sex,
        birthDate: patient.birthDate,
        city: patient.city,
      },
    });
  }

  private toDomain(row: PatientRow): Patient {
    return new Patient({
      id: row.id,
      fullName: row.fullName,
      sex: row.sex,
      birthDate: row.birthDate,
      city: row.city,
    });
  }
}
