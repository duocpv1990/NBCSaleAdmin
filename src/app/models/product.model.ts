import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
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
                Text: 'Trạng thái',
                type: 'select',
                data: [],
                condition: 'status'
            },

            {
                Text: '',
                type: 'search',
                condition: 'fullText'
            }];
    }


    public get collums(): Array<CollumsModel> {
        return [
            {
                id: 'checkbox',
                name: '',
                width: 100,
                type: 'checkbox',
            },
            {
                id: 'stt',
                name: 'STT',
                width: 100,
                type: 'text',
            },
            {
                id: 'image',
                name: 'Ảnh',
                width: 200,
                type: 'image'
            },
            {
                id: 'productName',
                name: 'Tên sản phẩm',
                width: 200,
                type: 'text',
            },
            {
                id: 'barcode',
                name: 'Mã vạch',
                width: 200,
                type: 'text',
            },
            {
                id: 'status',
                name: 'Trạng thái',
                width: 200,
                type: 'text',
            },
            {
                id: 'scanCount',
                name: 'Lượt quét',
                width: 200,
                type: 'text',
            },
            {
                id: 'vote',
                name: 'Lượt đánh giá',
                width: 200,
                type: 'text',
            },

            {
                id: 'condition',
                name: 'Tình trạng',
                width: 200,
                type: 'text',
            },

            {
                id: 'price',
                name: 'Gía',
                width: 200,
                type: 'text',
            },


            {
                id: 'infoStatus',
                name: 'Trạng thái thông tin',
                width: 200,
                type: 'text',
            },

        ];
    }

    public get btnActice(): Array<any> {
        return [
            {
                class: 'btn-create',
                text: 'Thêm mới',
                type: 'create',
                icon: ''
            },
            {
                class: 'btn-export',
                text: 'Export',
                type: 'export',
                icon: ''
            }
        ];
    }

    public get create(): Array<CreateModel> {
        return [
            {
                id: 'barcode',
                label: 'Mã vạch sản phẩm',
                name: 'barcode',
                type: 'text'
            },
            {
                id: 'productName',
                label: 'Tên sản phẩm',
                name: 'productName',
                type: 'text'
            },
            {
                id: 'price',
                label: 'Giá',
                name: 'price',
                type: 'text'
            },
            {
                id: 'category',
                label: 'Danh mục',
                name: 'category',
                type: 'text'
            },
            {
                id: 'productDetail',
                label: 'Chi tiết sản phẩm',
                name: 'productDetail',
                type: 'text'
            },
            {
                id: 'companyInfo',
                label: 'Thông tin công ty',
                name: 'companyInfo',
                type: 'text'
            },
            {
                id: 'distributor',
                label: 'Nhà phân phối',
                name: 'distributor',
                type: 'text'
            },
            {
                id: 'shop',
                label: 'Điểm bán',
                name: 'shop',
                type: 'text'
            },

            {
                id: 'avatar',
                label: 'Ảnh đại diện',
                name: 'avatar',
                type: 'img'
            }
        ];
    }

}