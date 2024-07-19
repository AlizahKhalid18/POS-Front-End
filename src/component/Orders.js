import { Table } from "antd";
function Orders(){
    const dataSource = [

    ];
    
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return(
<div>
<Table dataSource={dataSource} columns={columns} />;
</div>
    );
}
export default Orders;