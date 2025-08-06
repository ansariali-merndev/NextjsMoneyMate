export const CategoryCard = ({ item }) => {
  return (
    <div
      className="flex items-center px-6 py-4 gap-4 rounded-2xl bg-white"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 12px",
      }}
    >
      <div className="text-4xl bg-gray-100 rounded-full w-14 h-14 flex items-center justify-center">
        {item.emoji}
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
        <p className="text-sm text-gray-500 capitalize">{item.type}</p>
      </div>
    </div>
  );
};
