import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Parser from 'html-react-parser';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class CustomBootstrapTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
          tableData : this.props.data
        }
    }

    componentDidMount() {

    }

    render() {
        const marginRight = {
            marginRight: '3%'
        }
        
        //define columns for table
        let columns = this.props.columns
        const options = {
            page: 1,  // page that shows as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '10', value: 10
            },
            {
                text: '15', value: 15
            },
            {
                text: '20', value: 20
            }
            ], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last',
            paginationShowsTotal: true,  // Accept bool or function
            paginationPosition: 'bottom'  // default is bottom, top and both is all available
        };

        const { SearchBar } = Search;

        function onColumnMatch({ searchText, value, column, row }) {
            if (searchText == row.title || searchText == row.statement) {
                return true;
            }

        }

        return (
            <>
                <ToolkitProvider
                    keyField="id"
                    data={this.state.tableData}
                    columns={columns}
                    search
                    //search={onColumnMatch}
                >
                    {
                        props => (
                            <div>
                                <SearchBar {...props.searchProps} />

                                <BootstrapTable
                                    bootstrap4
                                    striped
                                    hover
                                    keyField='id'
                                    data={this.state.tableData}
                                    columns={columns}
                                    pagination={paginationFactory(options)}
                                    bordered={ false }
                                    wrapperClasses="table-responsive"
                                    {...props.baseProps} />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </>
        )
    }

}

export default CustomBootstrapTable;

