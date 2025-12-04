

import React from 'react';
import TokensTable from '../../components/table/tokens';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';

const Token = () => {
  return (
    <ConsolePageWrapper noBackground>
      <TokensTable />
    </ConsolePageWrapper>
  );
};

export default Token;
