import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class Authorization {

    public get enterpriseCollums(): Array<CollumsModel> {
        return [
            {
                id: 'checkbox',
                name: '',
                width: 100,
                type: 'checkbox',
            },
            {
                id: 'Enterprise',
                name: 'Doanh nghiệp',
                width: 200,
                type: 'text',
            },
        ];
    }

    public get distributorCollums(): Array<CollumsModel> {
        return [
            {
                id: 'checkbox',
                name: '',
                width: 100,
                type: 'checkbox',
            },
            {
                id: 'Distributor',
                name: 'Nhà phân phối',
                width: 200,
                type: 'text',
            },
        ];
    }

    public get productCollums(): Array<CollumsModel> {
        return [
            {
                id: 'checkbox',
                name: '',
                width: 100,
                type: 'checkbox',
            },
            {
                id: 'Product',
                name: 'Sản phẩm',
                width: 200,
                type: 'text',
            },
        ];
    }

    public get servicePackageCollums(): Array<CollumsModel> {
        return [
            {
                id: 'checkbox',
                name: '',
                width: 100,
                type: 'checkbox',
            },
            {
                id: 'ServicePackage',
                name: 'Gói dịch vụ',
                width: 200,
                type: 'text',
            },
        ];
    }


}