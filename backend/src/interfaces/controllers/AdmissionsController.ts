import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdmissionUseCase } from 'src/application/admission/use-cases/CreateAdmissionUseCase';
import { CreateAdmissionDto } from '../dtos/CreateAdmissionDto';
import { Inject } from '@nestjs/common';

@Controller('admissions')
export class AdmissionsController {
  constructor(
    @Inject(CreateAdmissionUseCase)
    private readonly createAdmissionUseCase: CreateAdmissionUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateAdmissionDto) {
    const admission = await this.createAdmissionUseCase.execute({
      patientId: body.patientId,
      admitedAt: new Date(body.admittedAt),
    });

    return admission;
  }
}
