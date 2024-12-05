interface RightSidebarProps {
  items: string[];
}

function RightSidebar({ items }: { items: JSX.Element }) {
  return (
    <div className="hidden lg:block fixed right-0 top-1/3 mr-4 lg:mr-16 xl:mr-24 w-32 lg:w-48 px-4 py-4 text-[#676451]">
      <ul className="text-sm space-y-2">
        <h2 className="font-bold text-lg mb-4">Table of Contents</h2>
        {items}
      </ul>
    </div>
  );
}

export default RightSidebar;
