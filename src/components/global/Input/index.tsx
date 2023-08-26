import { cn } from "@/lib/utils";
import { InputProps } from "@/types/global/InputProps";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { CgDanger } from 'react-icons/cg'

type ValidationResult = boolean | string;

export type ValidationRules = {
    email: (value: string, label?: string) => ValidationResult;
    required: (value: string, label?: string) => ValidationResult;
    phone: (value: string, label?: string) => ValidationResult;
    password: (value: string, label?: string) => ValidationResult;
    confirmPassword: (value: string, label?: string) => ValidationResult;
    noSpaces: (value: string, label?: string) => ValidationResult;
};

const Input = ({
    label,
    type = "text",
    id,
    onChange = () => { },
    max,
    min,
    pattern,
    rules = [],
    name,
    autoComplete = "off",
    disabled = false,
    focused = false,
    optional = false,
    className = "",
    showPassword: _showPassword = false,
    left,
    right,
    paddingLeft = "",
    paddingRight = "",
    customError,
    customMessage,
    tag = "input",
    ...rest
}: InputProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(_showPassword);
    const [passwordCheck, setPasswordCheck] = useState({
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        length: false,
    });
    const [passwordIsDirty, setPasswordIsDirty] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    const methods = useFormContext();

    const {
        watch,
        formState: { isDirty },
    } = methods;

    const validationRules: ValidationRules = {
        required: (value, label = "") => {
            if (value !== null && value !== undefined && value !== "") return true;
            else return `The ${label} field is required`;
        },
        email: (value, label = "") => {
            const match = value
                .toString()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            return match ? true : `The ${label} field has to be a valid email`;
        },
        password: (value, label = "") => {
            const messages: string[] = [];

            if (!/[A-Z]/g.test(value)) {
                messages.push("an uppercase letter");
            }
            if (!/[a-z]/g.test(value)) {
                messages.push("a lowercase letter");
            }
            if (!/[0-9]/g.test(value)) {
                messages.push("a number");
            }
            if (!/[*|\":<>[\]{}`\\()';@&$#!]/g.test(value)) {
                messages.push("a special character");
            }
            if (value.length < 8) {
                messages.push("at least 8 digits");
            }

            const message =
                messages.length > 1
                    ? `${messages.slice(0, -1).join(", ")} and ${messages.slice(-1)}`
                    : `${messages.join(", ")}`;
            return messages.length > 0
                ? `The ${label} field must have ${message}`
                : true;
        },
        phone: (value, label = "") => {
            return value.length <= 10
                ? true
                : `The ${label} field must be less than or equal to 12 digits`;
        },
        confirmPassword: (value, label = "") => {
            return value === watch("password")
                ? true
                : `The ${label} field must be equal to the Password field`;
        },
        noSpaces: (value, label = "") => {
            return !value.includes(" ")
                ? true
                : `The ${label} field is not allowed to contain spaces`;
        },
    };

    const computedRules = rules.reduce<{
        [index: string]: (param: string) => ValidationResult;
    }>((map, key) => {
        map[key] = (value) => validationRules[key](value, label || name);
        return map;
    }, {});

    const { error } = methods.getFieldState(name);

    const register = methods.register(name, {
        validate: computedRules,

        pattern: pattern
            ? {
                value: new RegExp(pattern),
                message:
                    errorMessage ||
                    `The ${label} field doesn't satisfy the regex ${pattern}`,
            }
            : undefined,
        min: min
            ? {
                value: min,
                message: `The ${label} field must be greater than or equal to ${min}`,
            }
            : undefined,
        max: max
            ? {
                value: max,
                message: `The ${label} field must be less than or equal to ${max}`,
            }
            : undefined,
    });

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused]);

    const watchPassword = watch("password");

    useEffect(() => {
        setPasswordCheck({
            ...passwordCheck,
            uppercase: /[A-Z]/g.test(watchPassword),
            lowercase: /[a-z]/g.test(watchPassword),
            number: /[0-9]/g.test(watchPassword),
            special: /[*|\":<>[\]{}`\\()';@&$#!]/g.test(watchPassword),
            length: watchPassword?.length >= 8,
        });
    }, [watchPassword]);

    if (tag === "textarea")
        return (
            <label htmlFor={id} className='flex flex-col relative'>
                <span className='w-full font-medium text-gray-500 text-sm text-left leading-5 capitalize mb-2'>
                    {label}
                </span>
                <textarea
                    {...register}
                    className={cn(
                        "w-full text-sm overflow-hidden bg-transparent border border-neutral font-normal rounded-lg outline-none",
                        className
                    )}
                    id={id}
                    onChange={(event) => {
                        register.onChange(event);
                    }}
                    ref={(e) => {
                        register.ref(e);
                        inputRef.current = e;
                    }}
                    disabled={disabled}
                />

                {!rules.includes("password") && (error || customError) && (
                    <span className='text-xs flex items-center space-x-2 text-left mt-2 text-rose-500'>
                        <CgDanger />
                        <span>{customError || error?.message}</span>
                    </span>
                )}
            </label>
        );

    return (
        <label htmlFor={id} className='flex flex-col relative'>
            {label && (
                <span className='w-full font-medium text-sm text-gray-500 text-left leading-5 capitalize mb-2'>
                    {label}
                </span>
            )}
            <input
                onFocus={() => setPasswordIsDirty(true)}
                {...register}
                className={cn(
                    "w-full text-sm h-[40px] px-2 bg-transparent border border-neutral overflow-hidden font-normal rounded-lg outline-none",
                    className,
                    { "pr-16": type === "password" },
                    left ? paddingLeft : "",
                    right ? paddingRight : ""
                )}
                type={showPassword ? "text" : type}
                id={id}
                onChange={(event) => {
                    register.onChange(event);
                    onChange(event);
                }}
                ref={(e) => {
                    register.ref(e);
                    inputRef.current = e;
                }}
                disabled={disabled}
                {...rest}
            />

            {type === "password" && (
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute flex items-center justify-center h-[35px] w-12 right-[2px] top-8 cursor-pointer'>
                    <div className='text-2xl font-bold pr-4'>
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </div>
                </button>
            )}

            {right && (
                <div className='absolute flex items-center justify-center h-[44px] right-[2px] top-1.5'>
                    {right}
                </div>
            )}

            {left && (
                <div className='absolute flex items-center justify-center h-[44px] left-[2px] top-1.5'>
                    {left}
                </div>
            )}

            {!rules.includes("password") && (error || customError) && (
                <span className='text-xs flex items-center space-x-2 text-left mt-2 text-rose-500'>
                    <CgDanger />
                    <span>{customError || error?.message}</span>
                </span>
            )}

            {passwordIsDirty && rules.includes("password") && (
                <div className='text-xs mt-2 text-left [&>*:nth-child(even)]:text-right grid grid-cols-2 gap-x-2 xl:gap-x-8 gap-y-1'>
                    <div
                        className={
                            passwordCheck.uppercase
                                ? "text-green-400"
                                : "text-rose-500"
                        }>
                        *<span className='hidden sm:inline'>Must contain</span>{" "}
                        <span className='capitalize sm:lowercase'>an</span> uppercase letter
                    </div>
                    <div
                        className={
                            passwordCheck.lowercase
                                ? "text-green-400"
                                : "text-rose-500"
                        }>
                        *<span className='hidden sm:inline'>Must contain</span>{" "}
                        <span className='capitalize sm:lowercase'>a</span> lowercase letter
                    </div>
                    <div
                        className={
                            passwordCheck.number
                                ? "text-green-400"
                                : "text-rose-500"
                        }>
                        *<span className='hidden sm:inline'>Must contain</span>{" "}
                        <span className='capitalize sm:lowercase'>a</span> number
                    </div>
                    <div
                        className={
                            passwordCheck.special
                                ? "text-green-400"
                                : "text-rose-500"
                        }>
                        *<span className='hidden sm:inline'>Must contain</span>{" "}
                        <span className='capitalize sm:lowercase'>a</span> special character
                    </div>
                    <div
                        className={
                            passwordCheck.length
                                ? "text-green-400"
                                : "text-rose-500"
                        }>
                        *<span className='hidden sm:inline'>Must contain</span>{" "}
                        <span className='capitalize sm:lowercase'>at</span> least 8
                        characters
                    </div>
                </div>
            )}

            {customMessage && (
                <span className='text-xs text-left mt-2 text-green-400'>
                    {customMessage}
                </span>
            )}

        </label>
    );
}

export default Input;