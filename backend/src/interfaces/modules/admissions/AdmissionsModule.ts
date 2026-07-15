import { Module } from '@nestjs/common';
import { AdmissionsController } from 'src/interfaces/controllers/AdmissionsController';
import { CreateAdmissionUseCase } from 'src/application/admission/use-cases/CreateAdmissionUseCase';
import { AdmissionPrismaRepository } from 'src/infrastructure/repositories/AdmissionPrismaRepository';
import { PrismaService } from 'src/infrastructure/prisma/PrismaService';
import { PatientsModule } from 'src/interfaces/modules/patients/PatientsModule';

@Module({
  imports: [PatientsModule],
  controllers: [AdmissionsController],
  providers: [
    PrismaService,
    {
      provide: 'AdmissionRepository',
      useClass: AdmissionPrismaRepository,
    },
    {
      provide: CreateAdmissionUseCase,
      useFactory: (admissionRepository, patientRepository) => {
        return new CreateAdmissionUseCase(
          admissionRepository,
          patientRepository,
        );
      },
      inject: ['AdmissionRepository', 'PatientRepository'],
    },
  ],
})
export class AdmissionModule {}
