interface RightSidebarProps {
  items: string[];
}
const RightSidebar: React.FC<RightSidebarProps> = ({ items }) => {
  return (
    <div className="hidden lg:block fixed right-0 top-1/3 mr-4 lg:mr-16 xl:mr-24 w-32 lg:w-48 px-4 py-4 text-[#676451]">
      <ul className="text-sm space-y-2">
        {items.map((item, index) => (
          <li key={index} className="cursor-pointer hover:text-slate-800">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
