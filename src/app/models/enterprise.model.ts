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
            value: 2,
            text: 'Hoạt động',
          },
          {
            value: 1,
            text: 'Không hoạt động',
          }
        ],
        condition: 'status'
      },
      {
        Text: 'Tình trạng',
        type: 'select',
        data: [
          {
            value: 2,
            text: 'Đã duyệt',
          },
          {
            value: 1,
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
      }, {
        class: 'btn-export',
        text: 'Export',
        type: 'export',
        icon: ''
      }, {
        class: 'btn-delete',
        text: 'Xoá',
        type: 'deleteAll',
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
        id: 'CompanyCertifications',
        label: '',
        name: 'CompanyCertifications',
        type: 'div',
        child: [
          {
            id: 'Name',
            label: 'Tên chứng nhận',
            name: 'Name',
            type: 'text'
          },
          {
            id: 'Status',
            label: 'Trạng thái',
            name: 'Status',
            type: 'text',
          },
          {
            id: 'ExpiredDate',
            label: 'Ngày hết hạn',
            name: 'ExpiredDate',
            type: 'date',
          },
          {
            id: 'CertificationMedias',
            label: 'Hình ảnh giấy chứng nhận',
            name: 'CertificationMedias',
            type: 'img',
            data: []
          },
        ],
      },
    ];
  }
  public get import(): any {
    return {
      'Tên doanh nghiệp (*)': {
        prop: 'Name',
        type: String,
        required: true
      },
      'Mã doanh nghiệp (*)': {
        prop: 'CompanyCode',
        type: String,
        required: true
      },
      'Mã địa điểm toàn cầu GLN (*)': {
        prop: 'GLN',
        type: String,
        required: true
      },
      'Mã số thuế (*)': {
        prop: 'TaxCode',
        type: String,
        required: true
      },
      'Quốc gia (*)': {
        prop: 'NationId',
        type: Number,
        required: true
      },
      'Thành phố/Tỉnh (*)': {
        prop: 'ProvinceId',
        type: Number,
        required: true
      },
      'Quận/Huyện (*)': {
        prop: 'District',
        type: Number,
        required: true
      },
      'Địa chỉ (*)': {
        prop: 'AddressDetail',
        type: String,
        required: true
      },
      'Email (*)': {
        prop: 'Email',
        type: String,
        required: true
      },
      'Ảnh đại diện (*)': {
        prop: 'MediaURL',
        type: String,
        required: true
      },
      'Ảnh nền (*)': {
        prop: 'BackgroundURL',
        type: String,
        required: true
      },
      'Tên chứng chỉ, chứng nhận - Trạng thái - Ngày hết hạn': {
        prop: 'CompanyCertifications',
        type: String,
        required: true
      },

    };
  }

}
