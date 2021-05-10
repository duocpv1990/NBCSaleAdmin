
export interface Contract {
    tableHeader: string[];
    tableData: ContractModel[];
}

export interface ContractModel {
    sellerCode?: string;
    id?: string;
    code?: string;
    sellerName?: string;
    product?: string;
    created?: string;
    effectiveDate?: string;
    expiredDate?: string;
    feeAmount?: string,
    insuredFullName?: string;
    status?: string;
    purchaseMethod?: string;
    beneficiary?: string;
    provider?: string;
    productPackDetail: {
        type: string,
        productPack: {
            name: string;
        }
    }
    seller: {
        idNumber: string,
        idIssuePlace: string,
        idIssueDate: string,
        Code: string,
        FullName: string,
        Avatar: string,
        PhoneNumber: string,
        BirthDay: string,
        Gender: string,
        CreatedDate: string,
        CancelDate: string,
        Status: string
    }
    jsonAttribute: string;
}

