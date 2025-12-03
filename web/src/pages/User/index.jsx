

import React from 'react';
import UsersTable from '@/components/table/users';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';

const User = () => {
  return (
    <ConsolePageWrapper>
      <UsersTable />
    </ConsolePageWrapper>
  );
};

export default User;
