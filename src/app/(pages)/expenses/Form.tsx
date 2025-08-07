import React from 'react';

type InputTextProps = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export const InputText: React.FC<InputTextProps> = ({ name, value, onChange, placeholder }) => (
    <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
);

type TextAreaProps = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
};

export const TextArea: React.FC<TextAreaProps> = ({ name, value, onChange, placeholder, rows }) => (
    <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
);

type ButtonProps = {
    type: 'submit' | 'button' | 'reset';
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => (
    <button
        type={type}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClick}
    >
        {children}
    </button>
);

type InputDateProps = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputDate: React.FC<InputDateProps> = ({ name, value, onChange }) => (
    <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
);
