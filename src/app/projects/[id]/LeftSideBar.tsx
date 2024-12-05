interface LeftSidebarProps {
  note: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ note }) => {
  return (
    <div className="hidden lg:block fixed left-0 top-1/3 w-48 lg:w-64 px-4 lg:px-8 py-4 text-red-400">
      <p className="pl-2 text-sm italic border-l-2 border-[#676451]">{note}</p>
    </div>
  );
};

export default LeftSidebar;
