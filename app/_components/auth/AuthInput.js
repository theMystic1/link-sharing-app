function AuthInput({ children, label, error }) {
  return (
    <div className=" py-2 md:py-4 w-full relative">
      <label
        className={`${
          error ? "text-red-600" : "text-greyy-900"
        } mb-4 font-light `}
      >
        {label}
      </label>

      <div
        className={`flex gap-4 w-full justify-between border ${
          error ? "border-red-600" : "border-greyy-700"
        } px-4 py-4 rounded-md `}
      >
        <div className="flex gap-4 ">{children}</div>
        {error ? <p className="text-red-600 hidden md:flex">{error}</p> : null}
      </div>
      {error ? (
        <p className="text-red-600 md:hidden flex mt-4">{error}</p>
      ) : null}
    </div>
  );
}

export default AuthInput;
