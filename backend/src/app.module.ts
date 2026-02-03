import { Module } from '@nestjs/common';
import { AdmissionModule } from './interfaces/modules/admissions/AdmissionsModule';
@Module({
  imports: [AdmissionModule],
})
export class AppModule {}
