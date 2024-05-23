import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex justify-between  items-center h-screen">
      <div className="w-full h-screen   ">
        <Image
          src="/login5.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-full "
          width={10000}
          height={100}
        />
      </div>
      <div className="h-screen w-full flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
