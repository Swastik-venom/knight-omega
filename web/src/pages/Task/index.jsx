

import React from 'react';
import TaskLogsTable from '../../components/table/task-logs';
import ConsolePageWrapper from '../../components/layout/ConsolePageWrapper';

const Task = () => (
  <ConsolePageWrapper noBackground>
    <TaskLogsTable />
  </ConsolePageWrapper>
);

export default Task;
