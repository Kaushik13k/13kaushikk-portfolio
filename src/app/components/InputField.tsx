export const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  errorMessage = "",
}: {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md"
        placeholder={placeholder}
      />
    )}
    {errorMessage && (
      <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
    )}
  </div>
);
