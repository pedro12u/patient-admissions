export class CreatePatientDto {
  fullName: string;
  sex: 'M' | 'F' | 'O';
  birthDate: string;
  city: string;
}
