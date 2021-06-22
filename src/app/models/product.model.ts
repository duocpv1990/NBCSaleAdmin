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
        type: 'scanStatus',
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

  public get general(): Array<CreateModel> {
    return [
      {
        id: 'barcode',
        label: 'Mã số sản phẩm toàn cầu (GTIN) (*)',
        name: 'barcode',
        type: 'text',
        required: true
      },
      {
        id: 'productName',
        label: 'Tên sản phẩm',
        name: 'productName',
        type: 'text',
        required: true
      },
      {
        id: 'price',
        label: 'Giá niêm yết',
        name: 'price',
        type: 'text'
      },
      {
        id: 'category',
        label: 'Ngành hàng',
        name: 'category',
        type: 'select',
        required: true
      },
      {
        id: 'distributor',
        label: 'Nhà phân phối',
        name: 'distributor',
        type: 'parent',
        required: true
      },
      {
        id: 'avatar',
        label: 'Ảnh đại diện',
        name: 'avatar',
        type: 'img'
      }
    ];
  }
  public get detal(): Array<CreateModel> {
    return [
      {
        id: 'Ingradient',
        label: 'Thành phần',
        name: 'Ingradient',
        type: 'text',
        required: true
      },
      {
        id: 'Label',
        label: 'Nhãn hiệu',
        name: 'Label',
        type: 'text',
        required: true
      },
      {
        id: 'Capacity',
        label: 'Khối lương/dung tích sản phẩm',
        name: 'Capacity',
        type: 'number',
        required: true
      },
      {
        id: 'Unit',
        label: 'Đơn vị',
        name: 'Unit',
        type: 'text',
        required: true
      },
      {
        id: 'ManufacturedOn',
        label: 'Ngày sản xuất',
        name: 'ManufacturedOn',
        type: 'date',
        required: true
      },
      {
        id: 'ExpiredOn',
        label: 'Thời hạn sử dụng',
        name: 'ExpiredOn',
        type: 'date',
        required: true
      },
      {
        id: 'Manual',
        label: 'Hướng dẫn sử dụng',
        name: 'Manual',
        type: 'text',
        required: true
      },
    ];
  }

}
