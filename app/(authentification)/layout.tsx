const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 flex justify-between  items-center h-screen">
      <div className="w-3/4 h-screen   ">
        <img
          src="login.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-full shadow-2xl"
        />
      </div>
      <div className="   h-screen w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
