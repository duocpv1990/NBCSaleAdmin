import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class Product {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Tên sản phẩm',
                type: 'text',
                data: [],
                condition: 'name'
            },
            {
                Text: 'Tên doanh nghiệp',
                type: 'text',
                data: [],
                condition: 'companyName'
            },
            {
              Text: 'Trạng thái',
              type: 'select',
              data: [
                {
                  value: 1,
                  text: 'Hoạt động',
                },
                {
                  value: 0,
                  text: 'Ngừng hoạt động',
                }
              ],
              condition: 'status'
            },
            {
                Text: 'Trạng thái thông tin',
                type: 'select',
                data: [
                  {
                    value: 1,
                    text: 'Đã duyệt',
                  },
                  {
                    value: 0,
                    text: 'Chưa duyệt',
                  }
                ],
                condition: 'type'
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
              id: 'rateCount',
              name: 'Lượt đánh giá',
              width: 200,
              type: 'text',
            },
            {
              id: 'scanStatus',
              name: 'Trạng thái quét',
              width: 200,
              type: 'text',
            },
            {
              id: 'price',
              name: 'Giá',
              width: 200,
              type: 'text',
            },
            {
              id: 'type',
              name: 'Tình trạng',
              width: 200,
              type: 'type',
            },
            {
              id: 'approve',
              name: 'Phê duyệt',
              width: 200,
              type: 'approve',
            },
            {
              id: 'noun',
              name: 'Hành động',
              width: 200,
              type: 'setting',
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
            // {
            //     class: 'btn-create',
            //     text: 'Cập nhật',
            //     type: 'update',
            //     icon: ''
            // },
            {
                class: 'btn-delete',
                text: 'Xoá sản phẩm',
                type: 'delete',
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
