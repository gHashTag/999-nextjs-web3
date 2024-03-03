import { cn } from '../../../helpers/utils';
import styles from './style.module.css';

export default function OptionTable({
  options,
  headers,
}: {
  options: [string, string, any];
  headers: [string];
}) {
  return (
    <div
      className={
        '-mx-6 mt-6 mb-4 overflow-x-auto overscroll-x-contain px-6 pb-4' +
        styles.container
      }
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b py-4 text-left dark:border-neutral-700">
            {headers.map((header) => (
              <th
                key={header}
                className="whitespace-pre py-2 pr-4 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="align-baseline text-gray-900 dark:text-gray-100">
          {options.map((row: string[]) => (
            <tr
              key={row[0]}
              className="border-b border-gray-100 dark:border-neutral-700/50"
            >
              {row.map((item, i) => (
                <td
                  key={`${item}-${i}`}
                  className={cn(
                    i === 0 ? 'text-blue-500' : 'text-slate-400',
                    'whitespace-pre py-2 pr-4 font-mono text-xs font-semibold leading-6'
                  )}
                >
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
