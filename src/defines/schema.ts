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

interface TextFieldRules extends FieldOptionBase {
  minLength?: number;
  maxLength: 20;
}

interface TextareaFieldRules extends FieldOptionBase {
  minLength?: number;
  maxLength: 50;
}

interface DateFieldRules extends FieldOptionBase {
  minDate?: string;
  maxDate?: string;
}

interface SelectFieldRules extends FieldOptionBase {}
interface CheckboxFieldRules extends FieldOptionBase {}

export interface FilterOption<T extends FieldDataType = FieldDataType> {
  text: string;
  value: FieldTypeMap[T];
}

export interface FieldBaseDefinition {
  name: string;
  label: string;
  uiType: FieldUi;
  value: FieldDataType;
  isPrimary?: boolean;
  filters?: FilterOption<FieldDataType>[];
}

export interface FieldPrimaryDefinition extends FieldBaseDefinition {
  uiType: 'none';
  value: 'number';
}

export interface TextFieldDefinition extends FieldBaseDefinition {
  uiType: 'text';
  value: 'string';
  rules: TextFieldRules;
}

export interface TextareaFieldDefinition extends FieldBaseDefinition {
  uiType: 'textarea';
  value: 'string';
  rules: TextareaFieldRules;
}

export interface DateFieldDefinition extends FieldBaseDefinition {
  uiType: 'date';
  value: 'string';
  rules?: DateFieldRules;
}

export interface CheckboxFieldDefinition extends FieldBaseDefinition {
  uiType: 'checkbox';
  value: 'boolean';
  rules?: CheckboxFieldRules;
}

type SelectFieldOption = {
  label: string;
  value: string;
};

export interface SelectFieldDefinition extends FieldBaseDefinition {
  uiType: 'select';
  value: 'string';
  rules?: SelectFieldRules;
  options: SelectFieldOption[];
}

export type FieldDefinition =
  | FieldPrimaryDefinition
  | TextFieldDefinition
  | TextareaFieldDefinition
  | DateFieldDefinition
  | CheckboxFieldDefinition
  | SelectFieldDefinition;

export type Schema = Array<FieldDefinition>;

type FieldValues<T extends Schema> = {
  [K in T[number] as K['name']]: FieldTypeMap[K['value']];
};

export type DataRecord<T extends Schema = Schema> = FieldValues<T> & { id: number };
