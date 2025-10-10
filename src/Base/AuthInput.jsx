const AuthInput = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
  pattern,
  minLength,
  maxLength,
  autoComplete,
}) => {
  const showError = Boolean(touched && error);
  return (
    <div className="w-full h-[80px]">
      <input
        className={`w-full h-[56px] rounded-lg bg-white border px-4 py-3 text-lg focus:outline-none transition-all ${
          showError
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-[#5664F5] focus:border-transparent"
        }`}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={
          name === "email"
            ? "123@example.com"
            : name === "name"
            ? "Sam J"
            : "Your password"
        }
        aria-invalid={showError}
        aria-describedby={`${name}-error`}
        required={required}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
      <div className="h-[15px] mt-[5px]">
        {showError ? (
          <p id={`${name}-error`} className="text-red-600 text-xs">
            {error}
          </p>
        ) : (
          <p className="text-xs">&nbsp;</p>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
