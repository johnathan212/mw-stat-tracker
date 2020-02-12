import React from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import {FaSortDown, FaSortUp} from 'react-icons/fa'
import styled from 'styled-components'
import './killStreakStats.css'

const Styles = styled.div`
  display: inline-block;

  table {
    border-spacing: 0;
    background-color: #292929;
    font-size: 20px;
    min-width: 70vw;

    thead {
        font-family: "Electrolize", Verdana, Arial, Helvetica, sans-serif;
        
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid white;
      border-right: 1px solid white;
      font-family: "Electrolize", Verdana, Arial, Helvetica, sans-serif;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setPageSize,
        state: {pageSize}
    } = useTable(
        {
            columns,
            data,
            initialState: {
              sortBy: [{id: 'kills', desc: true}],
              pageSize: 10
            }
        },
        useSortBy,
        usePagination
    )

    return(
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <FaSortDown/>
                          : <FaSortUp/>
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
        <div className="pagination" id="buttonDiv">
          <button id="moreKillStreakStats"onClick={ () => {setPageSize(pageSize === 10 ? 50 : 10); changeText()}} value="VIEW MORE">VIEW MORE ▼</button>
        </div>
      </>
    )
}

function changeText() {
  var elem = document.getElementById("moreKillStreakStats");
    console.log(elem.value)
    if (elem.value.localeCompare("VIEW MORE")) {
      elem.innerHTML = "VIEW MORE ▼";
      elem.value = "VIEW MORE"
    }else {
      elem.innerHTML = "VIEW LESS ▲";
      elem.value = "VIEW LESS"
    }
}

function KillStreakStats(props) {
  let killStreakStatsArray = []
  Object.values(props.killStreakStats).forEach(killStreakCategory=> {
    Object.keys(killStreakCategory).forEach(killStreakItem => {
        var killStreak = {
          name: killStreakItem,
          kills: killStreakCategory[killStreakItem].properties.extraStat1,
          uses: killStreakCategory[killStreakItem].properties.uses,
          awarded: killStreakCategory[killStreakItem].properties.awardedCount
        }
        killStreakStatsArray.push(killStreak)
    })
  })
  const columns = React.useMemo(
    () => [
      {
        Header: 'KILLSTREAKS',
        columns: [
          {
            Header: 'killstreak',
            accessor: 'name',
            Cell: props => props.cell.value.replace(/_/g, ' ').toUpperCase()
          },
          {
            Header: 'kills',
            accessor: 'kills',
            Cell: props => Number(props.cell.value).toLocaleString('en-US')
          },
          {
            Header: 'uses',
            accessor: 'uses',
            Cell: props => Number(props.cell.value).toLocaleString('en-US') 
          },
          {
            Header: 'awarded',
            accessor: 'awarded',
            Cell: props => Number(props.cell.value).toLocaleString('en-US')
          }
      ]
    }
  ],
  []
)

  return(
      <div id="killStreakStats">
      <Styles>
        <Table 
          columns={columns} 
          data={killStreakStatsArray}
        />
      </Styles>
    </div>
  )
}

export default KillStreakStats