function Button({ children, type = "primary" }) {
  return (
    <button
      className={`px-4 py-2 min-w-60 shadow-md  text-lg rounded-md ${
        type === "primary"
          ? "bg-purples-500 text-purples-50 hover:bg-purples-100 shadow-purples-500"
          : "bg-white-200 border-2 text-purples-500 border-purples-500 hover:bg-purples-100 hover:text-purples-50 shadow-greyy-200"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
