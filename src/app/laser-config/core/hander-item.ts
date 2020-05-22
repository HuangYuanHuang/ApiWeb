export enum MataTypeEnum {
    Input,
    Combox
}
export class DataVailModel {
    public Id: number;
    public Name: string;
    public Title: string;
    public DefaultValue: any;
    public Min: number;
    public Max: number;
    public IsDecimal: string;
    public DecimalDigit: string;
    constructor(defaultValue: any, min: number, max: number, isDecimal: boolean, digit: number) {
        this.DefaultValue = defaultValue;
        this.Max = max;
        this.Min = min;
        this.IsDecimal = String(isDecimal);
        this.DecimalDigit = String(digit);
    }

}
export class OperationModel {
    expand: boolean = false;
    Vails: DataVailModel[] = [];
    constructor(public Id: number, public Name: string, public Title: string) {

    }
}
export class HeaderItemModel {
    Id: number;
    PropName: string;
    DisplayName: string;
    MapKey: string;
    Index: number;
    IsReadOnly: string;
    Width: number;
    Format: string;
    InputFormat: string;
    VailModel: DataVailModel;
    PropType: string;
    InputType: string;
    Hide: string;
    expand: boolean = false;
    constructor(propName: string, displayName: string, propType: string, readOnly: boolean, format: string, inputType: MataTypeEnum, inputFormat: boolean, index: number, vail: DataVailModel, mapkey: string, width: number, isHide: boolean) {
        this.PropName = propName;
        this.DisplayName = displayName;
        this.PropType = propType;
        this.IsReadOnly = String(readOnly);
        this.Format = format;
        this.Index = index;
        this.InputType = MataTypeEnum[inputType];
        this.InputFormat = String(inputFormat);
        this.VailModel = vail;
        this.Width = width;
        this.MapKey = mapkey;
        this.Hide = String(isHide);
    }
}