import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from "styled-components"

import { NormalText } from '../../ui'


const PaginationWrapper = styled.View`
    width: 100%;
    flexDirection: row;
    align-items: baseline;
    justify-content: space-between;
`

const NormalTextCentered = styled(NormalText)`
    text-align: center;
`

const Pagination = (props) => {

    const { setPage, setOffset, limit, page, offset, totalPages, totalData } = props


    return (
        <>
            <PaginationWrapper>
                <TouchableOpacity
                    onPress={() => {
                        setPage(1)
                        setOffset(0)
                    }}
                >
                    <NormalText disabled={page === 1}>{'<< to the first'}</NormalText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setPage(page - 1)
                        setOffset(offset - limit)
                    }}
                >
                    <NormalText disabled={page === 1}>{'< prev'}</NormalText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setPage(page + 1)
                        setOffset(offset + limit)
                    }}
                >
                    <NormalText disabled={page === totalPages}>{'next >'}</NormalText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setPage(totalPages)
                        setOffset(totalData - limit)
                    }}
                >
                    <NormalText disabled={page === totalPages}>{'to the last >>'}</NormalText>
                </TouchableOpacity>
            </PaginationWrapper>
            <NormalTextCentered>{page} / {totalPages}</NormalTextCentered>
        </>
    )
}


export default Pagination
