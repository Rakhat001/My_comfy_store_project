import { useNavigate, useLoaderData, useLocation } from "react-router-dom"

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate()
  const handlePageChanger = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const AddPageButtons = ({ pageNumber, activeClass }) => {
    return (
      <button
        onClick={() => handlePageChanger(pageNumber)}
        key={pageNumber}
        className={`btn btn-xs sm:btn-md border-none join-item ${activeClass ? 'border-base-300 bg-base-300' : ''}`}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = [];
    //fist buttons
    pageButtons.push(AddPageButtons({ pageNumber: 1, activeClass: page === 1 }));
    // current buttons
    if(page !==1 && page !==pageCount)
    pageButtons.push(AddPageButtons({ pageNumber: page, activeClass: true }));
    // last buttons
    pageButtons.push(AddPageButtons({ pageNumber: pageCount, activeClass: page === pageCount }));
    return pageButtons;
  }


  if (pageCount < 2) { return null }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 2) {
              prevPage = pageCount
            }
            handlePageChanger(prevPage)
          }}
        >Prev</button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) {
              nextPage = 1
            }
            handlePageChanger(nextPage)
          }}
        >Next</button>
      </div>
    </div>
  )
}

export default ComplexPaginationContainer
