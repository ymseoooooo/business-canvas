import { DatePicker as AntdDatePicker, type DatePickerProps as AntdDatePickerProps } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

type DatePickerProps = AntdDatePickerProps;

dayjs.locale('ko');
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export function DatePicker(props: DatePickerProps) {
  return <AntdDatePicker {...props} />;
}
