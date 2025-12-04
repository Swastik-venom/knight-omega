

import React from 'react';
import ChannelsTable from '@/components/table/channels';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';

const Channel = () => {
  return (
    <ConsolePageWrapper noBackground>
      <ChannelsTable />
    </ConsolePageWrapper>
  );
};

export default Channel;
