import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import styled from "styled-components"
import axios from 'axios'
import { Provider } from 'react-redux'

import { ScrollViewStyled, BoldText, NormalText, TableStyled, HeaderRow, DataRow } from '../ui'
import Pagination from '../components/Pagination'

// import { store } from '../redux/store'


const BoldTextCentered = styled(BoldText)`
    text-align: center;
`

const NormalTextStyled = styled(NormalText)`
    margin-bottom: 10px;
`

const TableScreen = ({ navigation }) => {

    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ totalData, setTotalData ] = useState()
    const [ page, setPage ] = useState(1)
    const [ offset, setOffset ] = useState(0)

    const limit = 10

    useEffect(() => {
        axios.get(`http://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`)
            .then(res => {
                setData(res.data.MRData.DriverTable.Drivers)
                setTotalData(res.data.MRData.total)
                setLoading(false)
            })

    }, [offset])

    const totalPages = totalData ? Math.ceil(totalData / limit) : 0

    console.log(data)

    return (
        // <Provider store={store}>
            <ScrollViewStyled>
                <ActivityIndicator animating={loading} />
                <BoldTextCentered>Racers list</BoldTextCentered>
                <NormalTextStyled>Tap on racer's name to see detailed info</NormalTextStyled>
                {/*<NormalTextStyled>Tap here to explore all races</NormalTextStyled>*/}
                {
                    !loading && (
                        <>
                            <TableStyled>
                                <HeaderRow data={['Name', 'Last name', 'Nationality']} flexArr={[1, 1, 1, 1]} textStyle={{ textAlign: 'center', color: '#fff' }}/>
                                {
                                    data ? data.map((rowData, index) => {
                                        const allowed = ['givenName', 'familyName', 'nationality']
                                        const filtered = Object.keys(rowData)
                                            .filter(key => allowed.includes(key))
                                            .reduce((obj, key) => {
                                                obj[key] = rowData[key]
                                                return obj
                                            }, {})

                                        return (
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('RacerScreen', {driverId: rowData.driverId})}
                                                key={index}
                                            >
                                                <DataRow
                                                    data={Object.values(filtered)}
                                                    textStyle={{ textAlign: 'center', color: '#666' }}
                                                />
                                            </TouchableOpacity>
                                        )
                                    }) : (
                                        <Text>No data</Text>
                                    )
                                }
                            </TableStyled>
                            <Pagination
                                setPage={setPage}
                                setOffset={setOffset}
                                limit={limit}
                                page={page}
                                offset={offset}
                                totalPages={totalPages}
                                totalData={totalData}
                            />
                        </>
                    )
                }
            </ScrollViewStyled>
        // </Provider>
    )
}

export default TableScreen
