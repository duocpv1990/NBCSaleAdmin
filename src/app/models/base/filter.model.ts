export interface FilterModel {
          ContractCode: string;
          Seller: string;
          StartDate: string;
          EndDate: string;
          Status: string;
          Product:string;
          typeDayFilter:string
          data: ArrayModel | []
}

export interface ArrayModel {
          value : any;
          text: string
}