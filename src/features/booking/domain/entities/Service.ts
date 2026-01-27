export type ServiceType =
  | 'BATH'
  | 'HYGIENIC_CUT'
  | 'NAIL_TRIM'
  | 'BATH_AND_CUT'
  | 'STRIPPING';

export class Service {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly basePrice: number,
    public readonly type: ServiceType
  ) {}
}
