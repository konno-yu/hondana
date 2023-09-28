import { css, Theme, useTheme } from '@emotion/react';

interface Props {
  /** 入力欄の幅を指定します */
  width?: number;
  /** inputの種類を指定します（HTML準拠） */
  type?: string;
  /** 入力可能な最大文字数を指定します */
  maxLength?: number;
  /** 入力欄の先頭に表示するアイコンを指定します */
  icon?: JSX.Element;
  /** 入力欄に入力された値を指定します */
  value: string | number;
  /** 入力された時の動作を指定します */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ width = 200, type = 'text', maxLength = 100, icon, value, onChange }: Props) => {
  const theme = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {icon}
      <input css={[base(theme, width), normal(theme)]} type={type} maxLength={maxLength} value={value} onChange={onChange} />
    </div>
  );
};

const base = (theme: Theme, width: number) => css`
  width: ${width}px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 12pt;
  height: 1.5rem;
  font-weight: 600;
  border: none;
  border-bottom: 1px solid #efefef;
`;

const normal = (theme: Theme) => css`
  color: #333333;
  background: transparent;
  &:focus {
    outline: none;
    border-bottom: 1px solid #333333;
  }
`;
