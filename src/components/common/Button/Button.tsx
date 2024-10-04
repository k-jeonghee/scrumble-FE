import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';

type Variant = 'default' | 'primary' | 'confirm' | 'delete';

type ButtonProps = {
  text: string;
  name: string;
  variant?: Variant;
  onClick?: () => void | Promise<void>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, name, variant = 'default', onClick, ...rest }: ButtonProps) => {
  return (
    <button css={[buttonStyle, getVariantStyles(variant)]} onClick={onClick} name={name} {...rest}>
      {text}
    </button>
  );
};

export default Button;

const buttonStyle = () => css`
  width: 100%;
  height: 36px;
  border-radius: 6px;
  font-weight: 700;
`;

const getVariantStyles = (variant: Variant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: var(--color-primary-bg);
        color: var(--color-primary);
      `;
    case 'confirm':
      return css`
        background-color: var(--color-success-bg);
        color: var(--color-success);
      `;
    case 'delete':
      return css`
        background-color: var(--color-failed-bg);
        color: var(--color-failed);
      `;
    default:
      return css`
        background-color: var(--color-default-bg);
        color: var(--color-text);
      `;
  }
};
