import { ATENY, BARCELONA, MADRIT, RED, SALONIKI, SEWILLA } from "../../../Data/const";
import { getSellingPermitsCategory } from "./getSellingPermits";


export const delta_0h1h = [
    {
        estateName: ATENY,
        props: {
            owner: RED,
            nrOfHouses: 1
        }
    },
    {
        estateName: SALONIKI,
        props: {
            owner: RED,
            nrOfHouses: 0
        }
    }
]

export const o_0h_1h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [{
        locationsAfterTransaction: [
            { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
            { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
        ],
        nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
    }],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50 })]: [{
        locationsAfterTransaction: [
            { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
            { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
        ],
        nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
    }],
}

export const delta_1h_1h_0h = [
    {
        estateName: BARCELONA,
        props: {
            owner: RED, 
            nrOfHouses: 1
        }
    },
    {
        estateName: SEWILLA,
        props: {
            owner: RED,
            nrOfHouses: 1
        }
    },
    {
        estateName: MADRIT,
        props: {
            owner: RED,
            nrOfHouses: 0
        }
    }
]

export const o_1h_1h_0h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 100 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
        },
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 200 })]: [
        {
            locationsAfterTransaction: [
                { cityName: BARCELONA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: SEWILLA, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: MADRIT, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
        },
    ],
}

export const delta_2h_3h = [
    {
        estateName: ATENY,
        props: {
            owner: RED,
            nrOfHouses: 2
        }
    },
    {
        estateName: SALONIKI,
        props: {
            owner: RED,
            nrOfHouses: 3
        }
    }
]


export const o_2h_3h = {
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0 })]: [{
        locationsAfterTransaction: [
            { cityName: SALONIKI, nrOfHouses: 2, nrOfHotels: 0 },
            { cityName: ATENY, nrOfHouses: 3, nrOfHotels: 0 },
        ],
        nrOfSoldHotels: 0, nrOfSoldHouses: 0, price: 0
    }],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 2, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 2, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 1, price: 50
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 100 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 2, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 100
        },
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 2, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 2, price: 100
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 3, price: 150 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 3, price: 150
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 4, price: 200 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 1, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 4, price: 200
        },
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 1, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 4, price: 200
        },
    ],
    [getSellingPermitsCategory({ nrOfSoldHotels: 0, nrOfSoldHouses: 5, price: 250 })]: [
        {
            locationsAfterTransaction: [
                { cityName: SALONIKI, nrOfHouses: 0, nrOfHotels: 0 },
                { cityName: ATENY, nrOfHouses: 0, nrOfHotels: 0 },
            ],
            nrOfSoldHotels: 0, nrOfSoldHouses: 5, price: 200
        },
    ],

}























