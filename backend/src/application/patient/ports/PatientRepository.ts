import { Patient } from 'src/domain/entities/Patient';

export interface PatientRepository {
  findById(id: string): Promise<Patient | null>;
  findAll(): Promise<Patient[]>;
  existsById(id: string): Promise<boolean>;
  save(patient: Patient): Promise<void>;
}
