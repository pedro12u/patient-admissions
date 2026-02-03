export type PatientProps = {
  id: string;
  fullName: string;
  sex: 'M' | 'F' | 'O';
  birthDate: Date;
  city: string;
};

export class Patient {
  private readonly props: PatientProps;

  constructor(props: PatientProps) {
    this.validate(props);
    this.props = props;
  }

  private validate(props: PatientProps) {
    if (!props.fullName || props.fullName.trim().length < 3) {
      throw new Error('Nome do paciente deve ter pelo menos 3 caracteres');
    }

    if (!['M', 'F', 'O'].includes(props.sex)) {
      throw new Error('Sexo do paciente inválido');
    }

    if (!(props.birthDate instanceof Date)) {
      throw new Error('Data de nascimento inválida');
    }

    if (props.birthDate.getTime() > Date.now()) {
      throw new Error('Data de nascimento não pode ser no futuro');
    }
  }

  get id() {
    return this.props.id;
  }

  get fullName() {
    return this.props.fullName;
  }

  get sex() {
    return this.props.sex;
  }

  get birthDate() {
    return this.props.birthDate;
  }

  get city() {
    return this.props.city;
  }
}
