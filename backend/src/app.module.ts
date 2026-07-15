import { Module } from '@nestjs/common';
import { AdmissionModule } from './interfaces/modules/admissions/AdmissionsModule';
import { PatientsModule } from './interfaces/modules/patients/PatientsModule';
@Module({
  imports: [PatientsModule, AdmissionModule],
})
export class AppModule {}
