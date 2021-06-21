export class CreateModel {
    id: string;
    name: string;
    type: string;
    label: string;
    data?: DataModel[];
    class?: string;
}
export class DataModel {
  id: number;
  value: string;
}
