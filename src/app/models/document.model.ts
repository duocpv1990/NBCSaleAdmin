import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class DocumentModel {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Tên giấy tờ',
                type: 'text',
                data: [],
                condition: 'documentName'
            },
            {
                Text: 'Ngày hết hạn',
                type: 'date',
                data: [],
                condition: 'expiredDate'
            },
            {
                Text: 'Trạng thái',
                type: 'text',
                data: [],
                condition: 'status'
            },
            {
                Text: '',
                type: 'search',
                condition: "production"
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
                id: 'documentName',
                name: 'Tên giấy tờ',
                width: 200,
                type: 'text',
            },
            {
                id: 'expiredDate',
                name: 'Ngày hết hạn',
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
                id: 'file',
                name: 'File',
                width: 200,
                type: 'text',
            },
            {
                id: 'action',
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
            {
                class: 'btn-delete',
                text: 'Xoá',
                type: 'delete',
                icon: ''
            },

        ];
    }
    public get create(): Array<CreateModel> {
        return [
            {
                id: 'name',
                label: 'Tên doanh nghiệp',
                name: 'name',
                type: 'text'
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