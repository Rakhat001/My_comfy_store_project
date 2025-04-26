import { useNavigate, useLoaderData, useLocation } from "react-router-dom"

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  })
  const { search, pathname } = useLocation();
  const navigate = useNavigate()
  const handlePageChanger = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`)
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
        {pages.map((pageNumber) => {
          return (
            <button
              onClick={() => handlePageChanger(pageNumber)}
              key={pageNumber}
              className={`btn btn-xs sm:btn-md border-none join-item ${pageNumber === page ? 'border-base-300 bg-base-300' : ''}`}
            >
              {pageNumber}
            </button>
          )
        })}
        <button 
        className="btn btn-xs sm:btn-md join-item" 
        onClick={() => {
          let nextPage = page + 1;
          if(nextPage>pageCount){
            nextPage = 1
          }
          handlePageChanger(nextPage)
        }}
        >Next</button>
      </div>
    </div>
  )
}

export default PaginationContainer
