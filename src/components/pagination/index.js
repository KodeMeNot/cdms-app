import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export const Pagination = ({ onChangePageClick, currentPageNo, getCount, count, onPageSizeChange, currentPageSize,activePageTabItem }) => {

  let [pageNoText, setPageNoText] = useState(0);
  let [pageSize, setPageSize] = useState(currentPageSize);
  let [isTotalVisible, setTotalVisible] = useState(false);
  let [total, setTotal] = useState('');

  useEffect(() => {
    if (!Number(count)) count = 1;
  }, []);

  useEffect(() => {
    setTotalVisible(false);
    pageSize = 5;
    onPageSizeChange(pageSize);
    setPageSize(pageSize);
  },[activePageTabItem]);

  function onPreviosPageClick(e) {
    e.preventDefault();
    onChangePageClick(Number(currentPageNo) - 1);
  }

  function onNextPageClick(e) {
    e.preventDefault();
    onChangePageClick(Number(currentPageNo) + 1);
  }

  function onPageSizeClick(e) {
    pageSize = e.target.value;
    onPageSizeChange(pageSize);
    setPageSize(pageSize);
  }

  async function toggleTotal(e) {
    e.preventDefault();
    total = await getCount();
    setTotal(total);
    setTotalVisible(true);
  }

  return (
    <form style="display:contents">
      <table class="pagination-block">
        <tbody>
          <tr>
            <th>
              <span class="table-title">CHECKED: 0/5</span>
            </th>
            <th>
              {isTotalVisible && (
                <span class="table-title">TOTAL: {total}</span>
              )}
              {!isTotalVisible && (
                <span class="table-title">TOTAL: <span class="total" onclick={(e) => toggleTotal(e)}>Show Quantity</span></span>
              )}
            </th>
            <th>
              <div style="display: flex; padding: 10px;">
                <span style="padding: 8px 19px;" class="table-title">Pages: {currentPageNo} / {Math.ceil(count / pageSize)}</span>
                <button class="table-title no-padding" onClick={(e) => onPreviosPageClick(e)} style="cursor: pointer; margin: 0px 5px; border: 0px;"
                  disabled={(currentPageNo <= 1) || (pageNoText === 1)} >
                  <img style="width: 11px; margin-right: 5px;" src="/assets/images/prevPage.svg" />
                  <span style={`color: ${(currentPageNo === 1) || (pageNoText === 1)} ? '#535c69' : '#2067b0'`}>Previous</span>
                </button>
                <button class="table-title no-padding" onClick={(e) => onNextPageClick(e)} style="cursor: pointer; margin: 0px 5px; border: 0px;"
                  disabled={(currentPageNo === (Math.ceil(count / pageSize))) || (pageNoText === (Math.ceil(count / pageSize)))} >
                  <span style={`color: ${(currentPageNo === (Math.ceil(count / pageSize))) || (pageNoText === (Math.ceil(count / pageSize)))} ? '#535c69' : '#2067b0'`}>Next</span>
                  <img style="width: 11px; margin-left: 5px;" src="/assets/images/nextPage.svg" />
                </button>
              </div>
            </th>
            <th>
              <div style="display: flex; float: right;">
                <span class="table-title" style="padding: 10px;">RECORDS: </span>
                <select name="records" id="records" style="width: 55px" onchange={(e) => onPageSizeClick(e)}>
                  <option value="5" selected={pageSize === 5}>5</option>
                  <option value="10" selected={pageSize === 10}>10</option>
                  <option value="20" selected={pageSize === 20}>20</option>
                  <option value="50" selected={pageSize === 50}>50</option>
                  <option value="100" selected={pageSize === 100}>100</option>
                  <option value="200" selected={pageSize === 200}>200</option>
                  <option value="500" selected={pageSize === 500}>500</option>
                </select>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
