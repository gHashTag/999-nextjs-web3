import React from 'react';

// import LandingIcons from '@components/assets/LandingIcons';

// import CustomBtn from '../CustomBtn/CustomBtn';

type ChangelogContentProps = {
  children: React.ReactNode;
};

const ChangelogContent: React.FC<ChangelogContentProps> = ({ children }) => {
  return (
    <div className="w-full">
      {children}
      {/* <div className="flex items-center justify-between w-full">
        <div className="text-rgb-10 text-xs font-normal">
          Last updated on June 16, 2023
        </div>
        <CustomBtn
          className="gap-2 border border-custom-5 rounded-lg py-2 px-4"
          url="/get-started"
        >
          <div className="text-sm font-semibold text-rgb-7">Get Started</div>
          <div>{LandingIcons["chevron-right-btn"]}</div>
        </CustomBtn>
      </div> */}
    </div>
  );
};
export default ChangelogContent;
