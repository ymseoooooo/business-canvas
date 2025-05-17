import { Modal as AntdModal, type ModalProps as AntdModalProps } from 'antd';

type ModalProps = AntdModalProps;

export function Modal(props: ModalProps) {
  return <AntdModal {...props} />;
}
