type FieldUi = 'none' | 'text' | 'textarea' | 'date' | 'select' | 'checkbox';

type FieldTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
};

export type FieldDataType = keyof FieldTypeMap;
export type FieldData = FieldTypeMap[FieldDataType];

interface FieldOptionBase {
  required?: boolean;
}

interface TextFieldOption extends FieldOptionBase {
  minLength?: number;
  maxLength?: number;
}

interface DateFieldOption extends FieldOptionBase {
  minDate?: string;
  maxDate?: string;
}

interface SelectFieldOption extends FieldOptionBase {}
interface CheckboxFieldOption extends FieldOptionBase {}

export interface FieldBaseDefinition {
  name: string;
  label: string;
  uiType: FieldUi;
  value: FieldDataType;
  isPrimary?: boolean;
}

export interface FieldPrimaryDefinition extends FieldBaseDefinition {
  uiType: 'none';
  value: 'number';
}

export interface TextFieldDefinition extends FieldBaseDefinition {
  uiType: 'text' | 'textarea';
  value: 'string';
  options?: TextFieldOption;
}

export interface DateFieldDefinition extends FieldBaseDefinition {
  uiType: 'date';
  value: 'string';
  options?: DateFieldOption;
}

export interface CheckboxFieldDefinition extends FieldBaseDefinition {
  uiType: 'checkbox';
  value: 'boolean';
  options?: CheckboxFieldOption;
}

export interface SelectFieldDefinition extends FieldBaseDefinition {
  uiType: 'select';
  value: 'string';
  options?: SelectFieldOption;
}

export type FieldDefinition =
  | FieldPrimaryDefinition
  | TextFieldDefinition
  | DateFieldDefinition
  | CheckboxFieldDefinition
  | SelectFieldDefinition;

export type Schema = Array<FieldDefinition>;

type FieldValues<T extends Schema> = {
  [K in T[number] as K['name']]: FieldTypeMap[K['value']];
};

export type DataRecord<T extends Schema = Schema> = FieldValues<T> & { id: number };
