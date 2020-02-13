import React, { useState } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import styled from 'styled-components'
import {FaSortDown, FaSortUp} from 'react-icons/fa'
import './WeaponStats.css'

const Styles = styled.div`
  display: inline-block;

  table {
    border-spacing: 0;
    background-color: #292929;
    font-size: 20px;
    min-width: 70vw;
    border-top: 1px solid white;

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
        prepareRow,
        page,
        setPageSize,
        state: {pageSize},
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
          <button id="moreWeaponStats"onClick={ () => {setPageSize(pageSize === 10 ? 50 : 10); changeText()}} value="VIEW MORE">VIEW MORE ▼</button>
        </div>
      </>
    )
}

function changeText() {
  var elem = document.getElementById("moreWeaponStats");
    console.log(elem.value)
    if (elem.value.localeCompare("VIEW MORE")) {
      elem.innerHTML = "VIEW MORE ▼";
      elem.value = "VIEW MORE"
    }else {
      elem.innerHTML = "VIEW LESS ▲";
      elem.value = "VIEW LESS"
    }
}

function getWeaponName(weaponID){
  return String(weaponNameDict[weaponID])
}

function checkNaN(number) {
  if(isNaN(number) || (typeof number) === undefined) {
    return <div style={{color: 'gray'}}>N/A</div>
  } else {
    return number
  }
}

function getFilter(weaponStatsArray, filter) {
  let filteredWeaponStatsArray = []
  if(filter === "all") {
    return weaponStatsArray.slice()
  } else {
    weaponStatsArray.forEach(function(element) {
      if(element.category === `${filter}`) {
        filteredWeaponStatsArray.push(element)
      }
    })
  }
  return filteredWeaponStatsArray
}

function WeaponStats(props) {
  const [filter, setFilter] = useState("all")
  let weaponStatsArray = []
  Object.keys(props.weaponStats).forEach(weaponCategoryName=> {
      let weaponCategory = props.weaponStats[weaponCategoryName]
      Object.keys(weaponCategory).forEach(weaponItem => {
          var weapon = {
            name: weaponItem,
            kills: weaponCategory[weaponItem].properties.kills,
            deaths: weaponCategory[weaponItem].properties.deaths,
            kdRatio: (Number(weaponCategory[weaponItem].properties.kdRatio)).toFixed(2),
            headshots: weaponCategory[weaponItem].properties.headshots === undefined ? NaN : weaponCategory[weaponItem].properties.headshots,
            accuracy: Math.round(Number(weaponCategory[weaponItem].properties.accuracy * 100)),
            category: weaponCategoryName
          }
          if(weapon.name in weaponNameDict) {
            weaponStatsArray.push(weapon)
          }
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
        Cell: props => Number.isInteger(checkNaN(props.cell.value)) ? checkNaN(props.cell.value).toLocaleString('en-US') : checkNaN(props.cell.value)
      },
      {
        Header: 'accuracy',
        accessor: 'accuracy',
        Cell: props => Number.isInteger(checkNaN(props.cell.value)) ? (checkNaN(props.cell.value) + '%') : checkNaN(props.cell.value)
      }
    ],
    []
  )
  let filteredWeaponStatsArray = getFilter(weaponStatsArray, filter)
  
  return(
    <div id="weaponStats">
      <div id="weaponHeader">
        <div id="filterdiv">
          <select
            id="selectFilter"
            onChange={() => setFilter(document.getElementById("selectFilter").value)}
          >
            <option value="all">All</option>
            <option value="weapon_sniper">Sniper</option>
            <option value="weapon_lmg">LMG</option>
            <option value="weapon_launcher">Launcher</option>
            <option value="weapon_pistol">Pistol</option>
            <option value="weapon_assault_rifle">Assault Rifle</option>
            <option value="weapon_other">Other</option>
            <option value="weapon_shotgun">Shotgun</option>
            <option value="weapon_smg">SMG</option>
            <option value="weapon_marksman">Marksman</option>
            <option value="weapon_melee">Melee</option>
          </select>
        </div>
        <div id="header">Weapons</div>
        <div id="empty"></div>
      </div>
      <Styles>
        <Table 
          columns={columns} 
          data={filteredWeaponStatsArray}
        />
      </Styles>
    </div>
  )
}

export default WeaponStats