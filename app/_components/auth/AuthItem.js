function AuthItem({ children }) {
  return (
    <div className="bg-white-200 md:min-w-[480px] min-h-[480px] mt-8 flex flex-col p-4 gap-4 rounded-md">
      {children}
    </div>
  );
}

export default AuthItem;
