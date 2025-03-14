import { JSX } from "react";
import Data from "../interface";

interface ProfitLossReportProps {

    profitAndLossData: Data;
  
    renderRow: (row: Data['Rows']['Row'][0], level?: number) => JSX.Element | null;
  
  }
  
const ProfitLossReport = ({profitAndLossData,renderRow}:ProfitLossReportProps) => {
    return (
        <div>
        <div className="text-lg font-bold mb-4 flex justify-center">Profit and Loss Report</div>
        <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100 text-black">
                <tr>
                    <th className="px-4 py-2 border border-gray-300">Account</th>
                    {profitAndLossData.Columns.Column.slice(1).map((column, index) => (
                        <th key={`col-${index}`} className="px-4 py-2 border border-gray-300">
                            {column.ColTitle}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {profitAndLossData.Rows.Row.map((row, index) => renderRow(row, 0))}
            </tbody>
        </table>
        </div>
    );
};

export default ProfitLossReport;