import { CollumsModel } from "./base/collums.model";
import { CreateModel } from "./base/create.model";
import { FilterModel } from "./base/filter.model";
export class CertificateModel {
  public get create(): Array<CreateModel> {
    return [
        {
            id: 'name',
            label: 'Tên chứng chỉ, chứng nhận',
            name: 'name',
            type: 'text',
            class: 'ccc'
        },
        {
            id: 'status',
            label: 'Trạng thái',
            name: 'status',
            type: 'select'
        },
        {
            id: 'date',
            label: 'Ngày hết hạn',
            name: 'date',
            type: 'date'
        },
        {
            id: 'img',
            label: 'Hình ảnh giấy chứng nhận',
            name: 'img',
            type: 'image',
            child: [
              {
                id: 'date',
                label: 'Ngày hết hạn',
                name: 'date',
                type: 'date'
              },
            ]
        }
    ];
}

}
