import { ValidationRules } from "@/components/global/Input";

export type InputProps = {
    label?: string;
    placeholder?: string;
    type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "checkbox"
    | "submit"
    | "button"
    id?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: boolean | string | number;
    autoComplete?: string | boolean;
    focused?: boolean | (() => boolean);
    disabled?: boolean;
    step?: number;
    name: string;
    showPassword?: boolean;
    optional?: boolean;
    className?: string;
    customError?: string;
    customMessage?: string;
    left?: JSX.Element;
    right?: JSX.Element;
    tag?: "input" | "textarea";
    paddingLeft?: string;
    paddingRight?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    rules?: Array<keyof ValidationRules>;
    pattern?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
