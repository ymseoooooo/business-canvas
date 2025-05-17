import styled, { type CSSProperties } from 'styled-components';
import { Button as AntdButton, type ButtonProps as AntdButtonProps } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

// 사이즈별 css를 다르게 적용할 수 있게함
const BUTTON_SIZE: Record<NonNullable<SizeType>, CSSProperties> = {
  small: { height: '24px' },
  middle: { height: '32px' },
  large: { height: '40px' },
};

type ButtonProps = AntdButtonProps;

export function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}

const StyledButton = styled(AntdButton)<ButtonProps>`
  ${({ size = 'middle' }) => ({ ...BUTTON_SIZE[size] })};
`;
