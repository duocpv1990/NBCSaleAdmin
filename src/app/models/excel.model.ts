export class ExcelModel {
  public get company(): any {
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
  public get distributor(): any {
    return {
      'Tên doanh nghiệp (*)': {
        prop: 'CompanyName',
        type: String,
        required: true
      },
      'Tên nhà phân phối (*)': {
        prop: 'Name',
        type: String,
        required: true
      },
      'Mã số thuế': {
        prop: 'TaxCode',
        type: String
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
      'Số điện thoại (*)': {
        prop: 'AddressDetail',
        type: String,
        required: true
      },
      'Email (*)': {
        prop: 'Email',
        type: String,
        required: true
      },
      'Website': {
        prop: 'Website',
        type: String
      },
      'Ảnh đại diện': {
        prop: 'MediaURL',
        type: String,
        required: true
      },
      'Ảnh nền': {
        prop: 'BackgroundURL',
        type: String,
        required: true
      }
    };
  }
  public get product(): any {
    return {
      'Tên sản phẩm (*)': {
        prop: 'Name',
        type: String,
        required: true
      },
      'Mã số sản phẩm toàn cầu GTIN (*)': {
        prop: 'ProductCode',
        type: String,
        required: true
      },
      'Giá niêm yết (*)': {
        prop: 'Price',
        type: Number,
        required: true
      },
      'Ngành hàng (*)': {
        prop: 'CategoryId',
        type: Number,
        required: true
      },
      'Nhà phân phối (*)': {
        prop: 'DistributorId',
        type: Number,
        required: true
      },
      'Điểm bán': {
        prop: 'StoreId',
        type: Number
      },
      'Tên chứng chỉ, chứng nhận - Trạng thái - Ngày hết hạn': {
        prop: 'ProductCertifications',
        type: String
      },
      'Thành phần (*)': {
        prop: 'Ingredient',
        type: String,
        required: true
      },
      'Nhãn hiệu (*)': {
        prop: 'Label',
        type: String,
        required: true
      },
      'Khối lượng/dung tích sản phẩm (*)': {
        prop: 'Capacity',
        type: Number,
        required: true
      },
      'Đơn vị (*)': {
        prop: 'Unit',
        type: String,
        required: true
      },
      'Ngày sản xuất (*)': {
        prop: 'ManufacturedOn',
        type: Date,
        required: true
      },
      'Thời hạn sử dụng (*)': {
        prop: 'ExpiredOn',
        type: Date,
        required: true
      },
      'Hướng dẫn sử dụng (*)': {
        prop: 'Manual',
        type: String,
        required: true
      },

    };
  }
  public get store(): any {
    return {
      'Tên điểm bán (*)': {
        prop: 'Name',
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
      'Số điện thoại (*)' : {
        prop: 'PhoneNumber',
        type: String,
        required: true
      },
      'Email (*)': {
        prop: 'Email',
        type: String,
        required: true
      },
      'Website': {
        prop: 'Website',
        type: String
      },
      'Ảnh đại diện': {
        prop: 'MediaURL',
        type: String
      },
      'Ảnh nền': {
        prop: 'BackgroundURL',
        type: String
      }

    };
  }
}
