import { Module } from '@nestjs/common';
import { PatientsController } from 'src/interfaces/controllers/PatientsController';
import { CreatePatientUseCase } from 'src/application/patient/use-cases/CreatePatientUseCase';
import { FindPatientByIdUseCase } from 'src/application/patient/use-cases/FindPatientByIdUseCase';
import { ListPatientsUseCase } from 'src/application/patient/use-cases/ListPatientsUseCase';
import { UpdatePatientUseCase } from 'src/application/patient/use-cases/UpdatePatientUseCase';
import { PatientPrismaRepository } from 'src/infrastructure/repositories/PatientPrismaRepository';
import { PrismaService } from 'src/infrastructure/prisma/PrismaService';

@Module({
  controllers: [PatientsController],
  providers: [
    PrismaService,
    {
      provide: 'PatientRepository',
      useClass: PatientPrismaRepository,
    },
    {
      provide: CreatePatientUseCase,
      useFactory: (patientRepository) => {
        return new CreatePatientUseCase(patientRepository);
      },
      inject: ['PatientRepository'],
    },
    {
      provide: FindPatientByIdUseCase,
      useFactory: (patientRepository) => {
        return new FindPatientByIdUseCase(patientRepository);
      },
      inject: ['PatientRepository'],
    },
    {
      provide: ListPatientsUseCase,
      useFactory: (patientRepository) => {
        return new ListPatientsUseCase(patientRepository);
      },
      inject: ['PatientRepository'],
    },
    {
      provide: UpdatePatientUseCase,
      useFactory: (patientRepository) => {
        return new UpdatePatientUseCase(patientRepository);
      },
      inject: ['PatientRepository'],
    },
  ],
  exports: ['PatientRepository'],
})
export class PatientsModule {}
