export function Cards({ children, num, ...props }: any) {
  return (
    <div
      style={{
        marginTop: 20,
        gap: '16px',
        display: 'grid',
        gridAutoRows: '1fr',
        '--rows': (num as number) || 3,
        gridTemplateColumns:
          'repeat(auto-fill, minmax(max(250px, calc((100% - 1rem * 2) / var(--rows))), 1fr))',
      }}
      {...props}
    >
      <div className="h-full p-4 group flex flex-col justify-start overflow-hidden rounded-lg bg-transparent text-current no-underline shadow-sm shadow-gray-100 transition-all duration-200 dark:border-neutral-700 dark:shadow-none hover:border-gray-300 hover:shadow-md hover:shadow-gray-100 dark:hover:border-neutral-700  dark:hover:shadow-none active:shadow-sm active:shadow-gray-200">
        <div>{children}</div>
      </div>
    </div>
  );
}
