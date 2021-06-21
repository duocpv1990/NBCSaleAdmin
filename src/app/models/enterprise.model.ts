import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";

export class EnterPriseModel {


  public get filter(): Array<FilterModel> {
    return [
      {
        Text: 'Mã địa điểm toàn cầu',
        type: 'text',
        data: [],
        condition: 'global'
      },
      {
        Text: 'Tên doanh nghiệp',
        type: 'text',
        data: [],
        condition: 'name'
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
        Text: 'Tình trạng',
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
        condition: 'stt'
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
        id: 'code',
        name: 'Mã doanh nghiệp',
        width: 200,
        type: 'text',
      },

      {
        id: 'global',
        name: 'Mã địa điểm toàn cầu',
        width: 200,
        type: 'text',
      },
      {
        id: 'register',
        name: 'Tên doanh nghiệp',
        width: 200,
        type: 'text',
      },
      {
        id: 'gt',
        name: 'Gói dịch vụ',
        width: 200,
        type: 'text',
      },
      {
        id: 'status',
        name: 'Trạng thái',
        width: 200,
        type: 'text',
        color: '#26A700'
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
      {
        class: 'btn-delete',
        text: 'Xoá mã doanh nghiệp',
        type: 'delete',
        icon: ''
      }, {
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
        id: 'register',
        label: 'Tên doanh nghiệp',
        name: 'register',
        type: 'text'
      },
      {
        id: 'code',
        label: 'Mã doanh nghiệp',
        name: 'code',
        type: 'text'
      },
      {
        id: 'global',
        label: 'Mã địa điểm toàn cầu GLN',
        name: 'global',
        type: 'text'
      },
      {
        id: 'taxcode',
        label: 'Mã số thuế',
        name: 'taxcode',
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
      {
        id: 'addnew',
        label: 'GIẤY CHỨNG CHỈ, CHỨNG NHẬN',
        name: 'addnew',
        type: 'button'
      },
      {
        id: 'certifi',
        label: 'CHỨNG CHỈ, CHỨNG NHẬN',
        name: 'certifi',
        type: 'div',
        child: [
          {
            id: 'name',
            label: 'Tên chứng nhận',
            name: 'name',
            type: 'text'
          },
          {
            id: 'status',
            label: 'Trạng thái',
            name: 'status',
            type: 'text',
          },
          {
            id: 'date',
            label: 'Ngày hết hạn',
            name: 'status',
            type: 'date',
          },
          {
            id: 'image',
            label: 'Hình ảnh giấy trứng nhận',
            name: 'image',
            type: 'img',
            data: []
          },
        ],
      },
    ];
  }


}
