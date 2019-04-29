import {Aet} from "./models/aet";
import {Device} from "./models/device";
import {DcmWebApp} from "./models/dcm-web-app";

export interface J4careDateTime {
    FullYear:string;
    Month:string;
    Date:string;
    Hours:string;
    Minutes:string;
    Seconds:string;
    dateObject?:Date;
}
export type J4careDateTimeMode = "range" | "leftOpen" | "rightOpen" | "single";

export interface RangeObject {
    firstDateTime:J4careDateTime;
    secondDateTime:J4careDateTime;
    mode:J4careDateTimeMode;
}

export type StatisticsPage = "simple"|"detailed"

export type FilterTag = "button"|"input"|"checkbox"|"select"|"modality"|"range-picker-limit"|"range-picker-time"|"range-picker" | "p-calendar" |"multi-select"| "html-select"|"label"|"label_large"|"dummy"|"combined"|"number"|"size_range_picker";

export type RangeUnit = "hour" | "day" | "week" | "month" | "year";

export class SelectDropdown<T,S={}> {
    private _value:string;
    private _text:string;
    private _label:any;
    private _title?:string;
    private _htmlLabel:string;
    private _wholeObject:T;
    private _selected;
    constructor(value:any,text:string, title?:string, label?:any, htmlLabel?:string, wholeObject?:T){
        this._value = value;
        this._text = text || value;
        this._label = label || text || value;
        this._title = title;
        this._htmlLabel = htmlLabel;
        this._wholeObject = wholeObject;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get label(): any {
        return this._label;
    }

    set label(value:any) {
        this._label = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }


    get htmlLabel(): string {
        return this._htmlLabel;
    }

    set htmlLabel(value: string) {
        this._htmlLabel = value;
    }

    get wholeObject(): T {
        return this._wholeObject;
    }

    set wholeObject(value: T) {
        this._wholeObject = value;
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        this._selected = value;
    }
}
export type Quantity = "count"|"size"|string;
export type StudyDateMode = "StudyReceiveDateTime"|"StudyDate"|string;
export type FilterSchema = FilterSchemaElement[];

export interface FilterSchemaElement {
    tag:FilterTag;
    filterKey?:string;
    type?:"text"|"number";
    text?:string;
    id?:string;
    description?:string;
    placeholder?:string;
    showStar?:boolean;
    maxSelectedLabels?:number;
    min?:number,
    title?:string,
    options?:SelectDropdown<any>[],
    firstField?:FilterSchemaElement,
    secondField?:FilterSchemaElement,
    convert?:Function;
    cssClass?:string;
}

export type DicomMode = "study" | "patient" | "mwl" | "diff";
export type AccessLocation = "internal" | "external";

export interface StudyFilterConfig {
    filterSchemaEntry?:{schema:FilterSchema,lineLength:number};
    filterSchemaMain:{schema:FilterSchema,lineLength:number};
    filterSchemaExpand:{schema:FilterSchema,lineLength:number};
    filterEntryModel:any;
    filterModel:any;
    expand:boolean;
    quantityText:{
        count:string,
        size:string
    }
}

export interface StudyPageConfig {
    tab:DicomMode;
}

export type DicomResponseType = 'object'|'count'|'size';

