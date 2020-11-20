import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Linking } from 'react-native'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'

import { ScrollViewStyled, FlexRowView, BoldText, NormalText, HeaderText, TableStyled, HeaderRow, DataRow, InfoText } from '../ui'


const CircuitStyled = styled.View`
    margin: 10px 0;
`

const Link = styled(NormalText)`
    color: #8a78c9;
`

const RacerScreen = ({ navigation, route: { params: driverId } }) => {

    const [ driverData, setDriverData ] = useState([])
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        navigation.setOptions({
            title: <HeaderText>{driverId.driverId}'s page</HeaderText>
        })

        axios.get(`http://ergast.com/api/f1/drivers/${driverId.driverId}.json`)
            .then(res => {
                setDriverData(res.data.MRData.DriverTable.Drivers[0])
            })

        axios.get(`http://ergast.com/api/f1/drivers/${driverId.driverId}/qualifying.json`)
            .then(res => {
                setData(res.data.MRData.RaceTable.Races)
                setLoading(false)
            })
    }, [])

    const getValidData = (item) => item ? item : 'no data'


    return (
        <ScrollViewStyled>
            {
                driverData && (
                    <>
                        <FlexRowView>
                            <BoldText>{driverData.givenName} </BoldText>
                            <BoldText>{driverData.familyName}</BoldText>
                        </FlexRowView>
                        <BoldText>Date of birth:
                            <NormalText> {moment(driverData.dateOfBirth).format('DD.MM.YYYY')}</NormalText>
                        </BoldText>
                        <BoldText>Nationality:
                            <NormalText> {driverData.nationality}</NormalText>
                        </BoldText>
                        <BoldText>More info about racer:
                            <Link onPress={() => Linking.openURL(driverData.url)}>
                                &nbsp; open Wikipedia
                            </Link>
                        </BoldText>
                    </>
                )
            }
            <ActivityIndicator animating={loading} color='#8a78c9' />
            {
                data && data.map((circuit, i) => {
                    return (
                        <CircuitStyled key={i}>
                            <BoldText>Circuit №{i}</BoldText>
                            <TableStyled>
                                <HeaderRow data={['Circuit Name', 'Country', 'Locality', 'Date', 'Season']} flexArr={[1, 1, 1, 1, 1]} textStyle={{ textAlign: 'center', color: '#fff' }} />
                                <DataRow
                                    data={[
                                        `${getValidData(circuit.Circuit.circuitName)}`,
                                        `${getValidData(circuit.Circuit.Location.country)}`,
                                        `${getValidData(circuit.Circuit.Location.locality)}`,
                                        `${getValidData(moment(circuit.date).format('DD.MM.YYYY'))}`,
                                        `${getValidData(circuit.season)}`
                                    ]}
                                    textStyle={{ textAlign: 'center', color: '#666' }}
                                />
                            </TableStyled>
                            <NormalText>Qualifying Results:</NormalText>
                            <TableStyled>
                                <HeaderRow data={['Name', 'Number', 'Position', 'Q1', 'Q2', 'Q3']} flexArr={[1, 1, 1, 1, 1, 1]} textStyle={{ textAlign: 'center', color: '#fff' }} />
                                <DataRow
                                    data={[
                                        `${getValidData(circuit.QualifyingResults[0].Constructor.name)}`,
                                        `${getValidData(circuit.QualifyingResults[0].number)}`,
                                        `${getValidData(circuit.QualifyingResults[0].position)}`,
                                        `${getValidData(circuit.QualifyingResults[0].Q1)}`,
                                        `${getValidData(circuit.QualifyingResults[0].Q2)}`,
                                        `${getValidData(circuit.QualifyingResults[0].Q3)}`
                                    ]}
                                    textStyle={{ textAlign: 'center', color: '#666' }}
                                />
                            </TableStyled>
                        </CircuitStyled>
                    )
                })
            }
            {
                !loading && data.length === 0 && <InfoText>No races data</InfoText>
            }
        </ScrollViewStyled>
    )
}


export default RacerScreen
