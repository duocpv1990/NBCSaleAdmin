import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class DistributorModel {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Tên nhà phần phối',
                type: 'text',
                data: [],
                condition: 'name-dis'
            },
            {
                Text: 'Tên doanh nghiệp',
                type: 'text',
                data: [],
                condition: 'name-ent'
            },
            {
                Text: '',
                type: 'search',
                condition: 'production'
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
                id: 'distributor',
                name: 'Nhà phân phối',
                width: 200,
                type: 'text',
            },
            {
                id: 'address',
                name: 'Địa chỉ',
                width: 200,
                type: 'text',
            },
            {
                id: 'area',
                name: 'Khu vực',
                width: 200,
                type: 'text',
            },
            {
                id: 'code',
                name: 'Mã số thuế',
                width: 200,
                type: 'text',
            },
            {
                id: 'phone',
                name: 'Điện thoại',
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
                id: 'update',
                name: 'Cập nhập',
                width: 200,
                type: 'text',
            },
            // {
            //     id: 'status',
            //     name: 'Trạng thái',
            //     width: 200,
            //     type: 'text',
            //     color: '#26A700'
            // },
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
            },            {
                class: 'btn-export',
                text: 'Export',
                type: 'export',
                icon: ''
            },
            {
                class: 'btn-delete',
                text: 'Xóa',
                type: 'deleteAll',
                icon: ''
            }
        ];
    }
    public get create(): Array<CreateModel> {
        return [
            {
                id: 'name',
                label: 'Tên doanh nghiệp',
                name: 'name',
                type: 'select'
            },
            {
                id: 'distributorName',
                label: 'Mã doanh nghiệp',
                name: 'distributorName',
                type: 'text'
            },
            {
                id: 'mst',
                label: 'Mã số thuế',
                name: 'mst',
                type: 'text'
            },
            {
                id: 'country',
                label: 'Quốc gia',
                name: 'country',
                type: 'select'
            },
            {
                id: 'city',
                label: 'Thành phố/Tỉnh',
                name: 'city',
                type: 'select'
            },
            {
                id: 'district',
                label: 'Quận/Huyện',
                name: 'district',
                type: 'select'
            },
            {
                id: 'address',
                label: 'Địa chỉ',
                name: 'address',
                type: 'text'
            },
            {
                id: 'phone',
                label: 'Số điện thoại',
                name: 'phone',
                type: 'text'
            },
            {
                id: 'email',
                label: 'Email',
                name: 'email',
                type: 'text'
            },
            {
                id: 'website',
                label: 'Website',
                name: 'website',
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
