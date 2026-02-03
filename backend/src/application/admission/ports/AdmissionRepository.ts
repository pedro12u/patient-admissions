import { Admission } from 'src/domain/entities/Admission';

export interface AdmissionRepository {
  findActiveByPatientId(patientId: string): Promise<Admission | null>;
  save(admission: Admission): Promise<void>;
}
