import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class Account {


    public get filter(): Array<FilterModel> {
        return [
            {
                Text: 'Tên tài khoản',
                type: 'text',
                data: [],
                condition: 'Name'
            },
            {
                Text: 'Người tạo',
                type: 'text',
                data: [],
                condition: 'CreatePerson'
            },
            {
                Text: 'Nhóm quyền',
                type: 'select',
                data: [],
                condition: 'Privileges'
            },
            {
                Text: 'Tình trạng',
                type: 'select',
                data: [],
                condition: 'status'
            },

            {
                Text: 'Tìm kiếm',
                type: 'button',
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
                id: 'Name',
                name: 'Tên tài khoản',
                width: 200,
                type: 'text'
            },
            {
                id: 'UserName',
                name: 'Tên đăng nhập',
                width: 200,
                type: 'text',
            },
            {
                id: 'PhoneNumber',
                name: 'Số điện thoại',
                width: 200,
                type: 'text',
            },

            {
                id: 'Email',
                name: 'Email',
                width: 200,
                type: 'text',
            },
            {
                id: 'Privileges',
                name: 'Nhóm quyền',
                width: 200,
                type: 'text',
            },
            {
                id: 'CreatePerson',
                name: 'Người tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'CreateDate',
                name: 'Thời gian tạo',
                width: 200,
                type: 'text',
            },
            {
                id: 'status',
                name: 'Tình trạng',
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
                id: 'UserName',
                label: 'Tên đăng nhập',
                name: 'UserName',
                type: 'text'
            },
            {
                id: 'Password',
                label: 'Mật khẩu',
                name: 'Password',
                type: 'text'
            },
            {
                id: 'Email',
                label: 'Email',
                name: 'Email',
                type: 'text'
            },
            {
                id: 'PhoneNumber',
                label: 'Số điện thoại',
                name: 'PhoneNumber',
                type: 'text'
            },
            {
                id: 'AccountName',
                label: 'Tên tài khoản',
                name: 'AccountName',
                type: 'text'
            },
            {
                id: 'Privileges',
                label: 'Nhóm quyền',
                name: 'Privileges',
                type: 'select'
            },

        ];
    }

}