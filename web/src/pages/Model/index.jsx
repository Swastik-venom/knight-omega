
import React from 'react';
import ModelsTable from '../../components/table/models';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';

const ModelPage = () => {
  return (
    <ConsolePageWrapper noBackground>
      <ModelsTable />
    </ConsolePageWrapper>
  );
};

export default ModelPage;
