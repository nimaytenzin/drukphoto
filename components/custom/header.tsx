import { Input } from "../ui/input";

const Header = () => {
  return (
    <div
      className="relative flex flex-col justify-center items-center gap-4"
      style={{
        height: "40vh",
        backgroundImage: "url('12.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-60"
        style={{ zIndex: 1 }}
      ></div>

      <div
        className="flex flex-col justify-between items-center gap-4 p-6 rounded-md relative"
        style={{
          width: "50vw",
          zIndex: 2,
        }}
      >
        <p
          className="font-bold text-3xl text-center"
          style={{
            color: "#FCF9EA",
          }}
        >
          Stunning premium images captured exclusively in Bhutan
        </p>
        <div className="flex gap-2">
          <p
            className="px-2 py-1 rounded-md font-semibold"
            style={{
              color: "#FCF9EA",
              backgroundColor: "#49BEB7",
            }}
          >
            Explore
          </p>
          <p className="px-2 py-1 text-white font-semibold">Photos</p>
          <p className="px-2 py-1 text-white font-semibold">Illustrations</p>
        </div>
        <Input
          type="text"
          placeholder="Search for Images & Illustrations"
          className="flex-1 py-4 rounded-lg text-xl text-[#FCF9EA] placeholder-[#FCF9EA]"
          style={{
            fontSize: "1.1rem", // equivalent to text-xl
          }}
        />
        <div className="flex gap-2">
          <p className="py-1 bg-opacity-20 px-2 bg-white text-white rounded-md">
            Architecture
          </p>
          <p className="py-1 bg-opacity-20 px-2 bg-white text-white rounded-md">
            Landscape
          </p>
          <p className="py-1 bg-opacity-20 px-2 bg-white text-white rounded-md">
            Potraits
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
