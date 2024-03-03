import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useAccount, useDisconnect } from 'wagmi';

import { cn, extractProjectName, isValidEmail } from '../../helpers/utils';

interface props {
  apiKey: string;
  setProjectName: Dispatch<SetStateAction<string | null>>;
  setApiKey: Dispatch<SetStateAction<string>>;
  setProjectId: Dispatch<SetStateAction<string>>;
  projectName: string | null;
  setEmail: Dispatch<SetStateAction<string | null>>;
}

const DomainInputStrip: React.FC<props> = ({
  apiKey,
  setProjectName,
  setApiKey,
  setProjectId,
  projectName,
  setEmail,
}) => {
  const { isConnected, address } = useAccount();
  const [newProjectName, setNewProjectName] = useState<string>(projectName);
  const [newEmail, setNewEmail] = useState<string>('');

  const { mutateAsync: addApiKey } = useMutation({
    mutationFn: async ({ address }: { address: string; chain: string }) => {
      const { data } = await axios.request<{
        apiKey: string;
        email: string;
        projectId: string;
        domain: string;
      }>({
        method: 'POST',
        url: '/docs/api/createApiKey',
        data: {
          address,
          domain: newProjectName,
          email: newEmail,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data;
    },
    onSuccess: ({ apiKey, projectId, domain, email }) => {
      setApiKey(apiKey);
      setProjectId(projectId);
      if (!domain || !domain.length) return;
      setProjectName(domain);
      if (email) setEmail(email);
      toast.success('API Key generated successfully');
    },
  });

  const handleSubmit = async () => {
    if (newProjectName.length === 0) {
      toast.error('Enter Project Name first');
    } else if (!isValidEmail(newEmail)) {
      toast.error('Invalid Email');
    } else {
      try {
        await addApiKey({
          address,
          chain: 'ETHEREUM',
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 400) {
            toast.error(
              'This email is already registered with another project'
            );
          }
        }
      }
    }
  };

  return (
    <div className='flex flex-col gap-2 w-2/4'>
      <div className='bg-[#2D3748] rounded-lg shadow-md px-3 py-1.5'>
        <input
          disabled={!isConnected}
          type='url'
          className={cn(
            'grow text-lg bg-[#2D3748] rounded-lg p-2 border-none w-full focus:outline-none outline-none',
            !isConnected ? 'blur-sm' : ''
          )}
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder='Enter your project name'
        />
      </div>
      <div className='bg-[#2D3748] rounded-lg shadow-md px-3 py-1.5'>
        <input
          disabled={!isConnected}
          type='url'
          className={cn(
            'grow text-lg bg-[#2D3748] rounded-lg p-2 border-none w-full focus:outline-none outline-none',
            !isConnected ? 'blur-sm' : ''
          )}
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder='Enter your email'
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!isConnected}
        className='bg-blue-400 p-3 w-full rounded-lg text-black font-semibold'
      >
        Submit
      </button>
    </div>
  );
};

export default DomainInputStrip;
