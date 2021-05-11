import { FilterModel } from "./base/filter.model";

export class Product {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Mã sản phẩm',
                type: 'text',
                data: [],
                condition: 'code'
            },
            {
                Text: 'Tên sản phẩm',
                type: 'text',
                data: [],
                condition: 'product-name'
            },
            {
                Text: 'Công ty sở hữu',
                type: 'text',
                data: [],
                condition: 'owner'
            },
            {
                Text: 'Gói sản phẩm',
                type: 'text',
                data: [],
                condition: 'package'
            },
            {
                Text: 'Quyền quản lý',
                type: 'select',
                data: [],
                condition: 'authorization'
            },
            {
                Text: 'Trạng thái',
                type: 'select',
                data: [],
                condition: 'status'
            },
            {
                Text: 'Trạng thái thông tin',
                type: 'select',
                data: [],
                condition: 'info-status'
            },
            {
                Text: '',
                type: 'search',
                condition: 'fullText'
            }];
    }
}