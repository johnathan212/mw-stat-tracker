import React from 'react'
import { useTable, useSortBy } from 'react-table'
import styled from 'styled-components'
import {FaSortDown, FaSortUp} from 'react-icons/fa'
import './WeaponStats.css'
import Collapsible from 'react-collapsible'

const Styles = styled.div`
  padding: 1rem;
  display: inline-flex;

  table {
    margin-top: 10px;
    border-spacing: 0;
    border: 1px solid white;
    background-color: #292929;
    font-size: 20px;
    min-width: 70vw;

    thead {
        font-family: "Electrolize", Verdana, Arial, Helvetica, sans-serif;
        
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
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

const weaponNameDict = {
  iw8_sn_alpha50: "AX-50",
  iw8_sn_hdromeo: "HDR",
  iw8_sn_delta: "DRAGUNOV",
  equip_gas_grenade: "GAS GRENADE",
  equip_snapshot_grenade: "SNAPSHOT GRENADE",
  equip_decoy: "DECOY GRENADE",
  equip_smoke: "SMOKE GRENADE",
  equip_concussion: "CONCUSSION GRENADE",
  equip_hb_sensor: "SENSOR GRENADE",
  equip_flash: "FLASH GRENADE",
  equip_adrenaline: "ADRENALINE",
  equip_frag: "FRAG GRENADE",
  equip_thermite: "THERMITE",
  equip_semtex: "SEMTEX",
  equip_claymore: "CLAYMORE",
  equip_c4: "C4",
  equip_at_mine: "AT MINE",
  equip_throwing_knife: "THROWING KNIFE",
  equip_molotov: "MOLOTOV",
  iw8_lm_kilo121: "M91",
  iw8_lm_mgolf34: "MG34",
  iw8_lm_lima86: "SA87",
  iw8_lm_pkilo: "PKM",
  iw8_lm_mgolf36: "HOLGER-26",
  iw8_la_gromeo: "PILA",
  iw8_la_rpapa7: "RPG-7",
  iw8_la_juliet: "JOKR",
  iw8_la_kgolf: "STRELA-P",
  iw8_pi_cpapa: "0.357",
  iw8_pi_mike1911: "1911",
  iw8_pi_golf21: "X16",
  iw8_pi_decho: ".50 GS",
  iw8_pi_papa320: "M1911",
  iw8_ar_falima: "FAL",
  iw8_ar_tango21: "RAM-7",
  iw8_ar_mike4: "M4A1",
  iw8_ar_falpha: "FR 5.56",
  iw8_ar_mcharlie: "M13",
  iw8_ar_akilo47: "AK-47",
  iw8_ar_kilo433: "KILO-141",
  iw8_ar_scharlie: "FN SCAR 17",
  iw8_ar_asierra12: "ODEN",
  iw8_me_riotshield: "RIOT SHIELD",
  iw8_sh_charlie725: "726",
  iw8_sh_oscar12: "ORIGIN 12",
  iw8_sh_romeo870: "MODEL 680",
  iw8_sh_dpapa12: "R9-0 SHOTGUN",
  iw8_sm_mpapa7: "MP7",
  iw8_sm_augolf: "AUG",
  iw8_sm_papa90: "P90",
  iw8_sm_mpapa5: "MP5",
  iw8_sm_beta: "PP19 BIZON",
  iw8_sm_uzulu: "UZI",
  iw8_sn_sbeta: "MK2 CARBINE",
  iw8_sn_kilo98: "KAR98K",
  iw8_sn_mike14: "EBR-14",
  iw8_knife: "KNIFE"
}

function Table({columns, data}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: {
              sortBy: [{id: 'kills', desc: true}]
            }
        },
        useSortBy
    )
    const showNumRows = rows.slice(0, 10)

    return(
        <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
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
          {showNumRows.map(
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
      <br />
    </>
    )
}

function getWeaponName(weaponID) {
  return String(weaponNameDict[weaponID])
}

function checkNaN(number) {
  if(isNaN(number)) {
    return <div style={{color: 'gray'}}>N/A</div>
  } else {
    return number
  }
}

function WeaponStats(props) {
    console.log(props)
    let weaponStatsArray = []
    Object.values(props.weaponStats).forEach(weaponCategory=> {
        Object.keys(weaponCategory).forEach(weaponItem => {
            var weapon = {
              name: weaponItem,
              kills: weaponCategory[weaponItem].properties.kills,
              deaths: weaponCategory[weaponItem].properties.deaths,
              kdRatio: (Number(weaponCategory[weaponItem].properties.kdRatio)).toFixed(2),
              headshots: weaponCategory[weaponItem].properties.headshots,
              accuracy: Math.round(Number(weaponCategory[weaponItem].properties.accuracy * 100))
            }
            weaponStatsArray.push(weapon)
        })
    })
    const columns = React.useMemo(
      () => [
        {
          Header: 'weapon',
          accessor: 'name',
          Cell: props => getWeaponName(props.cell.value)
        },
        {
          Header: 'kills',
          accessor: 'kills',
          Cell: props => Number(props.cell.value).toLocaleString('en-US')
        },
        {
          Header: 'deaths',
          accessor: 'deaths',
          Cell: props => Number(props.cell.value).toLocaleString('en-US') 
        },
        {
          Header: 'kd ratio',
          accessor: 'kdRatio',
          Cell: props => checkNaN(props.cell.value),
        },
        {
          Header: 'headshots',
          accessor: 'headshots',
          Cell: props => checkNaN(Number(props.cell.value).toLocaleString('en-US')) 
        },
        {
          Header: 'accuracy',
          accessor: 'accuracy',
          Cell: props => Number.isInteger(checkNaN(props.cell.value)) ? (checkNaN(props.cell.value) + '%') : checkNaN(props.cell.value)
        }
      ],
      []
    )
    
    return(
      <div>
        <Styles>
          <Table 
            columns={columns} 
            data={weaponStatsArray}
          />
        </Styles>
        <Collapsible 
          trigger="VIEW MORE" 
          triggerWhenOpen="VIEW LESS"
          // onOpen={}
          >
        </Collapsible>
      </div>
    )
}

export default WeaponStats