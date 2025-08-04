
// Components for reusability (Input, Select):
type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: InputFieldProps) => (
  <div>
    <label htmlFor={id} className="block mb-2 font-semibold">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="input-style"
    />
  </div>
);


type Option = {
  id: number | string;
  title: string;
};

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
};

export const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
}: SelectFieldProps) => (
  <div>
    <label htmlFor={id} className="block mb-2 font-semibold">
      {label} <span className="text-red-600">*</span>
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required
      className="input-style"
    >
      <option value="">اختر</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.title}
        </option>
      ))}
    </select>
  </div>
);

type SelectStaticFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

export const SelectStaticField = ({
  id,
  label,
  value,
  onChange,
  options,
}: SelectStaticFieldProps) => (
  <div>
    <label htmlFor={id} className="block mb-2 font-semibold">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="input-style"
    >
      <option value="">اختر</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

