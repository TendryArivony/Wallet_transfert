import ReactPaginate from 'react-paginate';

const Pagination = ({ pages, change, current }) => {    

    return (
        <nav aria-label="Table Paging" className="my-3">
            <ReactPaginate  previousLabel='Prev'
                            nextLabel='Next'
                            breakLabel='...'
                            pageCount={pages} 
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={change}
                            containerClassName='pagination justify-content-end mb-0'
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName='page-item'
                            nextLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            activeClassName='active'
                            forcePage={current}
            />
        </nav>
    )
}

export default Pagination