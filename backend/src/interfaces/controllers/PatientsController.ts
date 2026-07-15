import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePatientUseCase } from 'src/application/patient/use-cases/CreatePatientUseCase';
import { FindPatientByIdUseCase } from 'src/application/patient/use-cases/FindPatientByIdUseCase';
import { ListPatientsUseCase } from 'src/application/patient/use-cases/ListPatientsUseCase';
import { UpdatePatientUseCase } from 'src/application/patient/use-cases/UpdatePatientUseCase';
import { CreatePatientDto } from '../dtos/CreatePatientDto';
import { UpdatePatientDto } from '../dtos/UpdatePatientDto';

@Controller('patients')
export class PatientsController {
  constructor(
    @Inject(CreatePatientUseCase)
    private readonly createPatientUseCase: CreatePatientUseCase,
    @Inject(FindPatientByIdUseCase)
    private readonly findPatientByIdUseCase: FindPatientByIdUseCase,
    @Inject(ListPatientsUseCase)
    private readonly listPatientsUseCase: ListPatientsUseCase,
    @Inject(UpdatePatientUseCase)
    private readonly updatePatientUseCase: UpdatePatientUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreatePatientDto) {
    return this.createPatientUseCase.execute({
      fullName: body.fullName,
      sex: body.sex,
      birthDate: new Date(body.birthDate),
      city: body.city,
    });
  }

  @Get()
  async list() {
    return this.listPatientsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.findPatientByIdUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePatientDto) {
    return this.updatePatientUseCase.execute({
      id,
      fullName: body.fullName,
      sex: body.sex,
      birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
      city: body.city,
    });
  }
}
