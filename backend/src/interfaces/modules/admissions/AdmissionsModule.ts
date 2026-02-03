import { Module } from '@nestjs/common';
import { AdmissionsController } from 'src/interfaces/controllers/AdmissionsController';
import { CreateAdmissionUseCase } from 'src/application/admission/use-cases/CreateAdmissionUseCase';
import { AdmissionPrismaRepository } from 'src/infrastructure/repositories/AdmissionPrismaRepository';
import { PrismaService } from 'src/infrastructure/prisma/PrismaService';

@Module({
  controllers: [AdmissionsController],
  providers: [
    PrismaService,
    {
      provide: 'AdmissionRepository',
      useClass: AdmissionPrismaRepository,
    },
    {
      provide: CreateAdmissionUseCase,
      useFactory: (admissionRepository) => {
        return new CreateAdmissionUseCase(admissionRepository);
      },
      inject: ['AdmissionRepository'],
    },
  ],
})
export class AdmissionModule {}
