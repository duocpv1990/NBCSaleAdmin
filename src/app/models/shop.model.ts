import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class ShopModel {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Tên cửa hàng',
                type: 'text',
                data: [],
                condition: 'name'
            },
            {
                Text: 'Tỉnh thành',
                type: 'select',
                data: [],
                condition: 'province'
            },
            {
                Text: 'Hình thức',
                type: 'select',
                data: [
                  {
                    value: 2,
                    text: 'Online',
                  },
                  {
                    value: 1,
                    text: 'Offline',
                  }
                ],
                condition: 'form'
            },
            {
                Text: '',
                type: 'search',
                condition: 'fullText'
            }];
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
                class: 'btn-delete',
                text: 'Xoá',
                type: 'delete',
                icon: ''
            },            {
                class: 'btn-export',
                text: 'Export',
                type: 'export',
                icon: ''
            }
        ];
    }
    public get collums(): Array<CollumsModel> {
        return [
            {
                id: 'checkbox',
                name: '',
                width: 100,
                type: 'checkbox',
            },
            // {
            //     id: 'stt',
            //     name: 'STT',
            //     width: 100,
            //     type: 'text',
            // },
            {
                id: 'MediaURL',
                name: 'Ảnh',
                width: 100,
                type: 'image',
            },

            {
                id: 'Name',
                name: 'Tên cửa hàng',
                width: 200,
                type: 'text',
            },
            {
                id: 'AddressDetail',
                name: 'Địa chỉ',
                width: 200,
                type: 'text',
            },
            {
                id: 'Province',
                name: 'Khu vực',
                width: 200,
                type: 'text',
            },
            {
                id: 'PhoneNumber',
                name: 'Điện thoại',
                width: 200,
                type: 'text',
            },
            {
                id: 'type',
                name: 'Hình thức',
                width: 200,
                type: 'text',
            },
            {
                id: 'production',
                name: 'Sản phẩm',
                width: 200,
                type: 'text',
            },
            {
                id: 'UpdatedOn',
                name: 'Cập nhập',
                width: 200,
                type: 'text',
            },
            {
                id: 'noun',
                name: 'Hành động',
                width: 200,
                type: 'setting',
            },

        ];
    }
    public get create(): Array<CreateModel> {
        return [
            {
                id: 'CompanyId',
                label: 'Tên doanh nghiệp',
                name: 'CompanyId',
                type: 'select'
            },
            // {
            //     id: 'DistributorId',
            //     label: 'Tên nhà phân phối',
            //     name: 'DistributorId',
            //     type: 'select'
            // },
            {
                id: 'Name',
                label: 'Điểm bán',
                name: 'Name',
                type: 'text'
            },
            {
              id: 'Type',
              label: 'Hình thức',
              name: 'Type',
              type: 'select',
              data: [
                {
                  id: 2,
                  value: 'Online'
                },
                {
                  id: 1,
                  value: 'Offline'
                },
              ]
          },
            {
                id: 'NationId',
                label: 'Quốc gia',
                name: 'NationId',
                type: 'select'
            },
            {
                id: 'ProvinceId',
                label: 'Thành phố/Tỉnh',
                name: 'ProvinceId',
                type: 'select'
            },
            {
                id: 'DistrictId',
                label: 'Quận/Huyện',
                name: 'DistrictId',
                type: 'select'
            },
            {
                id: 'AddressDetail',
                label: 'Địa chỉ',
                name: 'AddressDetail',
                type: 'text'
            },
            {
                id: 'PhoneNumber',
                label: 'Số điện thoại',
                name: 'PhoneNumber',
                type: 'text'
            },
            {
                id: 'Email',
                label: 'Email',
                name: 'Email',
                type: 'text'
            },
            {
                id: 'Website',
                label: 'Website',
                name: 'Website',
                type: 'text'
            },
            {
                id: 'avatar',
                label: 'Ảnh đại diện',
                name: 'avatar',
                type: 'img'
            },
            {
                id: 'background',
                label: 'Ảnh nền',
                name: 'background',
                type: 'img'
            },
        ];
    }

}
