import * as Tabs from '@radix-ui/react-tabs';

import { cn } from '../../../helpers/utils';
import Pill from '../Pill/Pill';

//* Wrapper
interface Props {
  children: JSX.Element;
  requestType?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  route?: string;
}

//* Request Card

export const APIRequestCard: React.FC<Props> = ({
  children,
  requestType,
  route,
}) => {
  const tabs = ['axios', 'fetch', 'cUrl'];

  return (
    <Tabs.Root defaultValue="axios" className="w-full">
      <div className="flex w-full items-center justify-between rounded-tl-xl rounded-tr-xl bg-[#1D2429] pt-3 px-3">
        <div className="text-slate-50 text-sm font-semibold mb-2">Request</div>
        <Tabs.List className="flex items-center gap-7 text-sm">
          {tabs.map((tab, i) => {
            return (
              <Tabs.Trigger
                id="tab"
                value={tab}
                key={`tabs-toggle-${i + 1}`}
                className={cn(
                  'transition-all duration-300 ease-out pb-2 font-semibold text-white'
                )}
              >
                {tab}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </div>
      <div className="p-2 py-3 flex items-center  bg-[#1D2429]/60 rounded-bl-xl rounded-br-xl">
        <Pill isMedium>{requestType}</Pill>&nbsp;
        <span className="font-mono text-xs text-gray-400">
          &bull;&nbsp;{route}
        </span>
      </div>
      {children}
    </Tabs.Root>
  );
};

interface APIRequestProps {
  children: JSX.Element;
  value: 'cUrl' | 'fetch' | 'axios';
}

export const APIRequestContent: React.FC<APIRequestProps> = ({
  children,
  value,
}) => {
  return (
    <div className="mt-2">
      <Tabs.Content className="w-full" value={value}>
        {children}
      </Tabs.Content>
    </div>
  );
};

//* Response Section

export const APIResponseCard: React.FC<Props> = ({ children }) => {
  const tabs = ['Success', 'Error'];

  return (
    <Tabs.Root defaultValue="Success" className=" w-full">
      <div className="flex w-full items-center justify-between rounded-xl bg-[#1D2429] pt-3 px-3 ">
        <div className="text-slate-50 text-sm font-semibold mb-2">Response</div>
        <Tabs.List className="flex items-center gap-7 text-sm">
          {tabs.map((tab, i) => {
            return (
              <Tabs.Trigger
                id="tab"
                value={tab}
                key={`tabs-toggle-${i + 1}`}
                className={cn(
                  'transition-all duration-300 ease-out pb-2 font-semibold text-white text-base'
                )}
              >
                {tab}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </div>
      {children}
    </Tabs.Root>
  );
};

interface APIResponseProps {
  children: JSX.Element;
  value: 'Success' | 'Error';
}

export const APIResponseContent: React.FC<APIResponseProps> = ({
  children,
  value,
}) => {
  return (
    <div className="mt-2">
      <Tabs.Content className="w-full" value={value}>
        {children}
      </Tabs.Content>
    </div>
  );
};
