import {formatAppDate} from './utils';
export const DB = {
    players : "players"
}


export const EVENTS = {
    U_12:[{
        eventName: "100M",
        eventId:"U_12_EVENTS_1",
        selection: false,
        disable:false
    },
    {
        eventName: "200M",
        eventId:"U_12_EVENTS_2",
        selection: false,
        disable:false
    },
    {
        eventName: "400M",
        eventId:"U_12_EVENTS_3",
        selection: false,
        disable:false
    },
    {
        eventName: "LONG_JUMP",
        eventId:"U_12_EVENTS_4",
        selection: false,
        disable:false
    },
    {
        eventName: "MEDICINE_BALL",
        eventId:"U_12_EVENTS_5",
        selection: false,
        disable:false
    }],
    U_14:[
        {
            eventName: "100M",
            eventId:"U_14_EVENTS_1",
            selection: false,
            disable:false
        },
        {
            eventName: "200M",
            eventId:"U_14_EVENTS_2",
            selection: false,
            disable:false
        },
        {
            eventName: "600M",
            eventId:"U_14_EVENTS_3",
            selection: false,
            disable:false
        },
        {
            eventName: "LONG_JUMP",
            eventId:"U_14_EVENTS_4",
            selection: false,
            disable:false
        },
        {
            eventName: "DISCUSS_THROW",
            eventId:"U_14_EVENTS_5",
            selection: false,
            disable:false
        },
        {
            eventName: "SHORT_PUT",
            eventId:"U_14_EVENTS_6",
            selection: false,
            disable:false
        }
    ],
    U_17:[
        {
            eventName: "100M",
            eventId:"U_17_EVENTS_1",
            selection: false,
            disable:false
        },
        {
            eventName: "400M",
            eventId:"U_17_EVENTS_2",
            selection: false,
            disable:false
        },
        {
            eventName: "1500M",
            eventId:"U_17_EVENTS_3",
            selection: false,
            disable:false
        },
        {
            eventName: "LONG_JUMP",
            eventId:"U_17_EVENTS_4",
            selection: false,
            disable:false
        },
        {
            eventName: "DISCUSS_THROW",
            eventId:"U_17_EVENTS_5",
            selection: false,
            disable:false
        },
        {
            eventName: "SHORT_PUT",
            eventId:"U_17_EVENTS_6",
            selection: false,
            disable:false
        },{
            eventName: "JAWLIN_THROW",
            eventId:"U_17_EVENTS_6",
            selection: false,
            disable:false
        }
    ],
    U_19:[
        {
            eventName: "100M",
            eventId:"U_19_EVENTS_1",
            selection: false,
            disable:false
        },
        {
            eventName: "200M",
            eventId:"U_19_EVENTS_2",
            selection: false,
            disable:false
        },
        {
            eventName: "1500M",
            eventId:"U_19_EVENTS_3",
            selection: false,
            disable:false
        },
        {
            eventName: "LONG_JUMP",
            eventId:"U_19_EVENTS_4",
            selection: false,
            disable:false
        },
        {
            eventName: "SHORT_PUT",
            eventId:"U_19_EVENTS_6",
            selection: false,
            disable:false
        }
    ]

}

export const U_14_EVENTS = ["100M, 200M, 600M", "SHORT_PUT", "LONG_JUMP", "DISCUSS_THROW"]
export const U_17_EVENTS = ["100M, 400M, 1500M", "SHORT_PUT", "LONG_JUMP", "DISCUSS_THROW", "JAWLIN_THROW"]
export const U_19_EVENTS = ["100M, 200M, 1500M", "SHORT_PUT", "LONG_JUMP"]


export const U_12_TIME = 1293926400000;  //01/01/2011  
export const U_14_TIME = 1230768000000;  //01/01/2009  
export const U_17_TIME = 1136073600000;  //01/01/2006  
export const U_19_TIME = 1072915200000;  //01/01/2004  

export const playerCategories = ["U_12", "U_14", "U_17", "U_19"]

export const U_12 = "U_12";
export const U_14 = "U_14";
export const U_17 = "U_17";
export const U_19 = "U_19";

export const initPlayerData = {
    name:"",
    adharNumber:"",
    clubName: "",
    dob:"",
    playerCategory:"",
    events:[],
    gender:"MALE",
    upi:"",
    mobile:"",
    selectedEvents: []
}

export const initError = {
    name:{touched:false,err: false},
    adharNumber: {touched:false,err: false},
    dob:{touched:false,err: false},
    upi:{touched:false,err: false},
    mobile:{touched:false,err: false},
}