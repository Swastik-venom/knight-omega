

import React from 'react';
import ChannelsTable from '@/components/table/channels';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';

const Channel = () => {
  return (
    <ConsolePageWrapper>
      <ChannelsTable />
    </ConsolePageWrapper>
  );
};

export default Channel;
