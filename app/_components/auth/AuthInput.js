function AuthInput({ children, label, error, onClick, className }) {
  return (
    <div
      className=" py-2 md:py-4 w-full relative cursor-pointer"
      onClick={onClick}
    >
      <label
        className={`${
          error ? "text-red-600" : "text-greyy-900"
        } mb-4 font-light `}
      >
        {label}
      </label>

      <div
        className={`flex gap-4 w-full items-center justify-between  border ${
          error ? "border-red-600" : "border-greyy-700"
        } px-4 py-2 rounded-md max-h-12 ${className}`}
      >
        <div className="flex gap-4 h-full w-full ">{children}</div>
        {error ? (
          <p className="text-red-600 hidden md:flex absolute right-2">
            {error}
          </p>
        ) : null}
      </div>
      {error ? (
        <p className="text-red-600 md:hidden flex mt-4">{error}</p>
      ) : null}
    </div>
  );
}

export default AuthInput;
