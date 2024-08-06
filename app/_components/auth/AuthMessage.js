function AuthMessage({ children, className }) {
  return (
    <p className={`text-greyy-700  text-lg mb-4 rounded-md ${className}`}>
      {children}
    </p>
  );
}

export default AuthMessage;
