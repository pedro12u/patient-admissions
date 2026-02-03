export type AdmissionStatus = 'ACTIVE' | 'DISCHARGED' | 'CANCELED';

export type AdmissionProps = {
  id: string;
  patientId: string;
  status: AdmissionStatus;
  admittedAt: Date;
  dischargedAt?: Date | null;
};

export class Admission {
  private readonly props: AdmissionProps;

  constructor(props: AdmissionProps) {
    this.validate(props);
    this.props = props;
  }

  private validate(props: AdmissionProps) {
    if (!(props.admittedAt instanceof Date)) {
      throw new Error('Data de internação inválida');
    }

    if (props.status === 'ACTIVE' && props.dischargedAt) {
      throw new Error('Internação ativa não pode possuir data de alta');
    }

    if (
      (props.status === 'DISCHARGED' || props.status === 'CANCELED') &&
      !props.dischargedAt
    ) {
      throw new Error('Internação finalizada deve possuir data de alta');
    }
    if (
      props.dischargedAt &&
      props.dischargedAt.getTime() < props.admittedAt.getTime()
    ) {
      throw new Error(
        'Data de alta não pode ser anterior à data de internação',
      );
    }
  }

  get id() {
    return this.props.id;
  }

  get patientId() {
    return this.props.patientId;
  }

  get status() {
    return this.props.status;
  }

  get admittedAt() {
    return this.props.admittedAt;
  }

  get dischargedAt() {
    return this.props.dischargedAt;
  }

  discharge(date: Date): Admission {
    if (this.props.status !== 'ACTIVE') {
      throw new Error('Apenas internações ativas podem receber alta');
    }
    if (!(date instanceof Date)) {
      throw new Error('Data de alta inválida');
    }

    return new Admission({
      ...this.props,
      status: 'DISCHARGED',
      dischargedAt: date,
    });
  }
}
