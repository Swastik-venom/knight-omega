

import React from 'react';
import UsageLogsTable from '@/components/table/usage-logs';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';
import './log-styles.css';

const Log = () => (
  <ConsolePageWrapper noBackground className='usage-log-page'>
    <UsageLogsTable />
  </ConsolePageWrapper>
);

export default Log;
