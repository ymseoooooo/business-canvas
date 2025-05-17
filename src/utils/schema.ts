import {
  type FieldDefinition,
  type CheckboxFieldDefinition,
  type FieldPrimaryDefinition,
  type TextFieldDefinition,
  type DateFieldDefinition,
  type SelectFieldDefinition,
} from '@/defines/schema';

export const isPrimaryField = (field: FieldDefinition): field is FieldPrimaryDefinition => {
  return field.isPrimary === true;
};

export const isTextField = (field: FieldDefinition): field is TextFieldDefinition => {
  return field.uiType === 'text' || field.uiType === 'textarea';
};

export const isDateField = (field: FieldDefinition): field is DateFieldDefinition => {
  return field.uiType === 'date';
};

export const isCheckboxField = (field: FieldDefinition): field is CheckboxFieldDefinition => {
  return field.uiType === 'checkbox';
};

export const isSelectField = (field: FieldDefinition): field is SelectFieldDefinition => {
  return field.uiType === 'select';
};
