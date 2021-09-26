import React from 'react';
import './App.css';
// import FormikForm from './Form/FormikForm/FormikForm';
// import ReactHookForm from './Form/reactHookForm/ReactHookForm';
// import RHFWithContext from './Form/reactHookForm/RHFWithContext';
import { InfiniteScroll } from './IntesectionObserver/IntersectionObserverExample';
// import InfiniteScrollTablePagination from './PaginatedScroll/InfiniteScrollTablePagination';
// import TableField from './TableField/TableField';

function App() {
  return (
    <div className="App">
      {/* <TableField/> */}
      {/* <InfiniteScrollTablePagination /> */}
      <InfiniteScroll />
      { /* <ReactHookForm /> */}
      { /* <RHFWithContext/> */}
      { /* <FormikForm/> */}
    </div>
  );
}

export default App;
