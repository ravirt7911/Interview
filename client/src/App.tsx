import React, { useEffect, useState } from 'react';
import Data from './interface';
import ProfitLossReport from './components/ProfitLossReport';
import BalanceSheet from './components/BalanceSheet';
function App() {
  const [profitAndLossData, setProfitAndLossData] = useState<Data | null>(null);
  const [balanceSheetData, setBalanceSheetData] = useState<Data | null>(null);

  const fetchProfitAndLoss = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quickbooks/profit-and-loss`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedData = await res.json();
      setProfitAndLossData(fetchedData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchBalanceSheet = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quickbooks/balance-sheet`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedData = await res.json();
      setBalanceSheetData(fetchedData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchProfitAndLoss();
    fetchBalanceSheet();
  }, []);

  if (!profitAndLossData || !balanceSheetData) return <div>Loading...</div>;

  const renderRow = (row: Data['Rows']['Row'][0], level = 0) => {
    const indentStyle = `pl-${level * 4}`;
    const isHeaderRow = row.Header && row.Header.ColData;
    const isDataRow = row.ColData;
    const isSummaryRow = row.Summary && row.Summary.ColData;

    if (isHeaderRow && row.Header) {
      return (
        <React.Fragment key={`header-${row.Header.ColData[0]?.value}`}>
          <tr>
            <td className={`px-4 py-2 border border-gray-300 font-bold ${indentStyle}`}>
              {row.Header.ColData[0]?.value || ''}
            </td>
            {row.Header.ColData.slice(1).map((cell, index) => (
              <td key={`header-cell-${index}`} className="px-4 py-2 border border-gray-300">
                {cell.value || ''}
              </td>
            ))}
          </tr>
          {row.Rows?.Row.map((subRow, index) => renderRow(subRow, level + 1))}
        </React.Fragment>
      );
    }

    if (isDataRow) {
      return (
        <tr key={`data-${row.ColData?.[0]?.value}`}>
          <td className={`px-4 py-2 border border-gray-300 ${indentStyle}`}>
            {row.ColData ? row.ColData[0]?.value || '' : ''}
          </td>
          {row.ColData?.slice(1).map((cell, index) => (
            <td key={`data-cell-${index}`} className="px-4 py-2 border border-gray-300">
              {cell.value || ''}
            </td>
          ))}
        </tr>
      );
    }

    if (isSummaryRow) {
      return (
        <tr key={`summary-${row.Summary?.ColData[0]?.value}`}>
          <td className={`px-4 py-2 border border-gray-300 ${indentStyle} font-bold`}>
            {row.Summary?.ColData[0]?.value || ''}
          </td>
          {row.Summary?.ColData.slice(1).map((cell, index) => (
            <td key={`summary-cell-${index}`} className="px-4 py-2 border border-gray-300 font-bold">
              {cell.value || ''}
            </td>
          ))}
        </tr>
      );
    }

    return null;
  };

  return (
    <div className='flex flex-col justify-center p-4'>
      <ProfitLossReport profitAndLossData={profitAndLossData} renderRow={renderRow}/>
      <BalanceSheet balanceSheetData={balanceSheetData} renderRow={renderRow}/>
    </div>
  );
}

export default App;
