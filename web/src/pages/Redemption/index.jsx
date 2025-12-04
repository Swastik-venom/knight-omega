

import React from 'react';
import RedemptionsTable from '../../components/table/redemptions';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';

const Redemption = () => {
  return (
    <ConsolePageWrapper noBackground>
      <RedemptionsTable />
    </ConsolePageWrapper>
  );
};

export default Redemption;
