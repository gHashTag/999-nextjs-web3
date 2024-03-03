import React from 'react';

import { cn } from '../../helpers/utils';

interface Props {
  headers: string[];
  options: string[][];
}

const ApiRefTable: React.FC<Props> = ({ headers, options }) => {
  return (
    <div
      className={
        '-mx-6 mt-6 mb-4 overflow-x-auto overscroll-x-contain px-6 pb-4'
      }
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b py-4 text-left dark:border-neutral-700">
            {headers.map(header => (
              <th className="py-2 font-semibold" key={header}>
                {header}
              </th>
            ))}
            {/* <th className="py-2 pl-6 font-semibold">Type</th>
          <th className="py-2 px-6 font-semibold">Description</th> */}
          </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
          {options.map(row => (
            <tr
              key={row[0]}
              className="border-b border-gray-100 dark:border-neutral-700/50"
            >
              {row.map((item, i) => (
                <td
                  key={item}
                  className={cn(
                    i === 0
                      ? 'text-blue-600 dark:text-blue-500'
                      : 'text-slate-500 dark:text-slate-400',
                    'py-2 pr-4 font-mono text-xs font-semibold leading-6 break-words w-fit'
                  )}
                >
                  {item}
                </td>
              ))}
              {/* <td className="whitespace-pre py-2 pl-6 font-mono text-xs font-semibold leading-6 text-slate-500 dark:text-slate-400">
              {type}
            </td>
            <td className="py-2 pl-6">{description}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiRefTable;
