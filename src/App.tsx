import { useEffect, useState } from "react";
import "./App.css";
// import { useLocalStorage } from "./hooks/useLocalStorage";
import { useLocalStorageState } from "./hooks/useLocalStorage";
import qs from "qs"

// import FormikForm from './Form/FormikForm/FormikForm';
// import ReactHookForm from './Form/reactHookForm/ReactHookForm';
// import RHFWithContext from './Form/reactHookForm/RHFWithContext';
// import { InfiniteScroll } from './IntesectionObserver/IntersectionObserverExample';
// import InfiniteScrollTablePagination from './PaginatedScroll/InfiniteScrollTablePagination';
// import TableField from './TableField/TableField';

interface ChildProps {
  lsKey: string;
  initialValue: string;
}

const getSearchParams = (search: string) => qs.parse(search.replace("?", ""), {
  depth: 10,
}) || {}

const Child = ({ lsKey, initialValue }: ChildProps) => {
  // const { value, setValue } = useLocalStorageV2(lsKey, initialValue);
  const [value, setValue] = useLocalStorageState(lsKey, initialValue);

  const [inputValue, setInputValue] = useState("");
  const handleSubmit = () => setValue(inputValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, setValue]);


  const searchValue: any = getSearchParams("query%5Blabel%5D=properties&query%5BsearchKey%5D=&query%5BorderBy%5D%5B0%5D%5Bpro_propertyname%5D=asc&query%5BpageNum%5D=0&query%5BpageSize%5D=50&query%5BselectedDynamicColumns%5D%5B0%5D=pro_town&query%5BselectedDynamicColumns%5D%5B1%5D=marketbyassettype&query%5BselectedDynamicColumns%5D%5B2%5D=submarketbyassettype&query%5BselectedDynamicColumns%5D%5B3%5D=mainuse_emea&query%5BselectedDynamicColumns%5D%5B4%5D=mainuse_de&query%5BselectedDynamicColumns%5D%5B5%5D=pro_totaltotalinv&query%5BselectedDynamicColumns%5D%5B6%5D=pro_sizeland&query%5BselectedDynamicColumns%5D%5B7%5D=pro_yearofconstruction&query%5BselectedDynamicColumns%5D%5B8%5D=pro_totalrefurbishment&query%5BselectedDynamicColumns%5D%5B9%5D=condition&query%5BselectedDynamicColumns%5D%5B10%5D=propertycategory&query%5BselectedDynamicColumns%5D%5B11%5D=ownercompany&query%5BselectedDynamicColumns%5D%5B12%5D=ownercompany_history&query%5BselectedDynamicColumns%5D%5B13%5D=pro_current_netpurchaseprice&query%5BselectedDynamicColumns%5D%5B14%5D=pro_current_validity&query%5BselectedDynamicColumns%5D%5B15%5D=pro_current_purchasepricesqm&query%5BselectedDynamicColumns%5D%5B16%5D=pro_current_actualmultiplier&query%5BselectedDynamicColumns%5D%5B17%5D=pro_current_date&query%5BselectedDynamicColumns%5D%5B18%5D=cbre_mandates&query%5BselectedDynamicColumns%5D%5B19%5D=transactions_investment&query%5BselectedDynamicColumns%5D%5B20%5D=transactions_investment_cbre&query%5BselectedDynamicColumns%5D%5B21%5D=transactions_leasing&query%5BselectedDynamicColumns%5D%5B22%5D=transactions_leasing_cbre&query%5BselectedDynamicColumns%5D%5B23%5D=property_id&query%5Bpolygons%5D%5B0%5D%5Bid%5D=84b3b6411a16d2fb7618a9577c8d6ae0&query%5Bpolygons%5D%5B0%5D%5Btype%5D=Feature&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B0%5D%5B0%5D=12.748927978243387&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B0%5D%5B1%5D=53.49651830234751&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B1%5D%5B0%5D=9.053048690163564&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B1%5D%5B1%5D=51.888516252590904&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B2%5D%5B0%5D=10.048093113876803&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B2%5D%5B1%5D=49.70267486824534&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B3%5D%5B0%5D=20.614517232362005&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B3%5D%5B1%5D=48.64954453911514&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B4%5D%5B0%5D=19.42994053746395&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B4%5D%5B1%5D=53.35534975480624&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B5%5D%5B0%5D=18.292746910363036&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B5%5D%5B1%5D=53.35534975480624&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B6%5D%5B0%5D=12.748927978243387&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Bcoordinates%5D%5B0%5D%5B6%5D%5B1%5D=53.49651830234751&query%5Bpolygons%5D%5B0%5D%5Bgeometry%5D%5Btype%5D=Polygon");

  console.log(searchValue);

  return (
    <div>
      <div>Selected key  : {lsKey}</div>
      <div>Selected value  : {value}</div>
      <div>
        <input type="text" onChange={(evt) => setInputValue(evt.target.value)} />
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

function App() {
  const [init, setInit] = useState({ key: "Key1", value: "Value1" });

  const handleClick = (key: string) => {
    setInit({
      key,
      value: key === "key1" ? "value1" : "value2",
    });
  };

  return (
    <div className="App">
      {/* <TableField/> */}
      {/* <InfiniteScrollTablePagination /> */}
      {/* <InfiniteScroll /> */}
      {/* <ReactHookForm /> */}
      {/* <RHFWithContext/> */}
      {/* <FormikForm/> */}
      <button id="key1" onClick={() => handleClick("key1")}>
        Key 1
      </button>
      <button id="key2" onClick={() => handleClick("key2")}>
        Key 2
      </button>
      <Child lsKey={init.key} initialValue={init.value} />
    </div>
  );
}

export default App;
