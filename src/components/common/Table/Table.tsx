import { cn } from '../../../helpers/utils';

interface Props {
  headerData: string[];
  dataArr: {
    header: string;
  }[];
}

const Table: React.FC<Props> = ({ headerData }) => {
  const dataArr = [
    {
      header: 'type',
      definition: 'Type of Peer : Either “host” or “guest”',
      datatype: 'string enum : “host”',
      mandatory: "“guest”'",
    },
    {
      header: 'name',
      definition: 'Name of the Peer	',
      datatype: 'string',
      mandatory: 'Y',
    },
    {
      header: 'roomId',
      definition: 'RoomId for which Token needs to Be Generated',
      datatype: 'string',
      mandatory: 'Y',
    },
  ];

  return (
    <div className="mt-14   w-full">
      <div className="mb-7 text-[#f1f5f9] font-semibold text-2xl">
        Required parameters
      </div>

      <div className=" w-full border-b border-[#383838] pb-4 grid md:grid-cols-[0.3fr,1fr,0.5fr,0.5fr] grid-cols-[0.4fr,1fr,0.8fr,0.5fr]">
        {headerData.map(data => (
          <div
            className={cn('text-[#e2e8f0]  text-sm font-inter font-semibold ')}
            key={data}
          >
            {data}
          </div>
        ))}
      </div>

      {dataArr.map(({ datatype, definition, header, mandatory }) => (
        <div
          className="grid md:grid-cols-[0.3fr,1fr,0.5fr,0.5fr] grid-cols-[0.4fr,1fr,0.8fr,0.5fr] w-full border-b border-[#383838] py-4 last:border-none text-sm "
          key={header}
        >
          <div className="text-blue-500   font-mono font-semibold w-full">
            {header}
          </div>
          <div className="text-[#94a3b8]   font-mono font-semibold">
            {definition}
          </div>
          <div className="text-[#94a3b8]   font-mono font-semibold">
            {datatype}
          </div>
          <div className="text-[#f3f4f6]  font-mono font-normal">
            {mandatory}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
