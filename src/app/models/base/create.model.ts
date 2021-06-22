export class CreateModel {
    id: string;
    name: string;
    type: string;
    label: string;
    data?: DataModel[];
    required?: boolean;
    class?: string;
    child?: CreateModel[];
}
export class DataModel {
  id: number;
  value: string;
}
