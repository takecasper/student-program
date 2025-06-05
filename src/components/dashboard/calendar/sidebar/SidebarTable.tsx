export const SidebarTable = () => {
  return (
    <div className="px-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Available Electives</h3>
      <table className="w-full text-sm text-left text-gray-700 border-collapse">
        <thead>
          <tr className="text-gray-500 font-medium">
            <th className="py-2">Elective</th>
            <th className="py-2">City</th>
            <th className="py-2">Start/End</th>
            <th className="py-2">Spots</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-400 text-sm text-center">
            <td colSpan={5} className="py-6">
              No data
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
