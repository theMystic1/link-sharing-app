function Button({ children, type = "primary", onClick }) {
  return (
    <button
      className={`px-4 py-2 font-bold  shadow-md  text-lg rounded-md flex items-center justify-center transition-all duration-500 ${
        type === "primary"
          ? "bg-purples-500  text-purples-50 hover:bg-purples-100 shadow-purples-500"
          : "bg-white-200 border-2 text-purples-500 border-purples-500 hover:bg-purples-50 hover:text-purples-100 shadow-greyy-200 "
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
