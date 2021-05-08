import React from "react";
import { Chart as ch, registerables } from 'chart.js';
ch.register(...registerables);

const Chart = () => {
    let start_list = ["H1", "H2", "H3", "H11", "K01", "K02", "K03", "K04", "K05", "K06", "SJ1", "SJ2", "SJ3", "SJ4", "SJ5"]
    //let end_list = ["CH", "EH", "WH", "LRT", "SMT", "TCT", "TKTL", "TKTM", "TSCA", "TWCP", "TWTM"]
    let valid_list = {
        "H11": ["CH", "EH"],
        "H1": ["CH", "EH"],
        "H2": ["CH", "EH", "WH"],
        "H3": ["CH", "WH"],
        "K01": ["CH", "WH"],
        "K02": ["CH", "EH"],
        "K03": ["CH", "EH", "WH"],
        "K04": ["CH", "WH"],
        "K05": ["CH", "EH"],
        "K06": ["CH", "WH"],
        "SJ1": ["LRT", "SMT", "TSCA"],
        "SJ2": ["LRT", "TCT", "SJ2", "TSCA"],
        "SJ3": ["LRT", "TCT", "TSCA"],
        "SJ4": ["TKTL", "TKTM"],
        "SJ5": ["TWCP", "TWTM"]
    }
    return (
        <div className="container">
            <label for="LOCATION_ID">LOCATION ID: </label>
            <select name="LOCATION_ID" id="input_LOCATION_ID"
                onChange={() => {
                    let tempHtml = "";
                    let tempList = valid_list[start_list[document.querySelector("#input_LOCATION_ID").selectedIndex]];
                    for (let i = 0; i < tempList.length; i++) {
                        tempHtml = tempHtml + '<option value="' + tempList[i] + '" >' + tempList[i] + '</option>'
                    }
                    document.querySelector("#input_DESTINATION_ID").innerHTML = tempHtml;
                }}>
                {start_list.map((value, index) => {
                    return (<option value={value} key={index}>{value}</option>)
                })}
            </select>
            <label for="DESTINATION_ID">DESTINATION ID: </label>
            <select name="DESTINATION_ID" id="input_DESTINATION_ID">
                {valid_list["H11"].map((value, index) => {
                    return (<option value="value" key={index}>{value}</option>)
                })}
            </select>
            <br />
            <input type="radio" id="input_type_0" name="input_type" value="0" />
            {"Waiting time in the past 10 hours"}
            <br />
            <input type="radio" id="input_type_1" name="input_type" value="1" />
            {"Waiting time in this hour of past 7 days"}
            <br />
            <button type="button" id="check" onClick={async () => {
                let input_type = -1;
                if (document.querySelector("#input_type_0").checked) {
                    input_type = 0
                } else if (document.querySelector("#input_type_1").checked) {
                    input_type = 1
                }
                let LOCATION_ID = start_list[document.querySelector("#input_LOCATION_ID").selectedIndex]
                let DESTINATION_ID = valid_list[start_list[document.querySelector("#input_LOCATION_ID").selectedIndex]][document.querySelector("#input_DESTINATION_ID").selectedIndex]
                if (input_type !== -1) {
                    const timeToString = (thee, flag = true) => {
                        let ur = "" + thee.getFullYear()
                        if (!flag) {
                            ur = ur + "/"
                        }
                        ur = ur + ("" + ((thee.getMonth() + 1) < 10 ? ("0" + (thee.getMonth() + 1)) : ("" + (thee.getMonth() + 1))))
                        if (!flag) {
                            ur = ur + "/"
                        }
                        ur = ur + ("" + thee.getDate() < 10 ? ("0" + thee.getDate()) : ("" + thee.getDate()))
                        ur = ur + "-"
                        ur = ur + ("" + thee.getHours() < 10 ? ("0" + thee.getHours()) : ("" + thee.getHours()))
                        if (!flag) {
                            ur = ur + ":"
                        }
                        ur = ur + ("" + thee.getMinutes() < 10 ? ("0" + thee.getMinutes()) : ("" + thee.getMinutes()))
                        return ur;
                    }

                    const get_data = async (input_type) => {
                        document.querySelector("#result").innerHTML = "Loading"
                        const label_list = []
                        const data_list = []
                        let now_date = new Date()
                        let ur = "https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fresource.data.one.gov.hk%2Ftd%2Fjourneytime.xml&time="
                        if (input_type === 0) {
                            for (let i = 0; i < 11; i++) {
                                for (let j = 0; j < (i === 9 ? 5 : 4); j++) {
                                    let thee = new Date((now_date.getTime()) - 60 * 1000 * 60 * i - 60 * 1000 * 15 * j)
                                    await fetch(ur + timeToString(thee, true))
                                        .then(response => response.text())
                                        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                                        .then(data => {
                                            let a = data.querySelectorAll("jtis_journey_list LOCATION_ID")
                                            for (let k = 0; k < a.length; k++) {
                                                if (a[k].textContent === LOCATION_ID && a[k].nextElementSibling.textContent === DESTINATION_ID) {
                                                    if (a[k].nextElementSibling.nextElementSibling.nextElementSibling.textContent === "1") {
                                                        data_list.unshift(parseInt(a[k].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent))
                                                        label_list.unshift(timeToString(thee, false))
                                                        break;
                                                    }
                                                }
                                            }
                                        }).catch(() => { })
                                }
                            }
                        } else {
                            for (let i = 0; i < 8; i++) {
                                for (let j = 0; j < 5; j++) {
                                    let thee = new Date((now_date.getTime()) - 60 * 1000 * 60 * 24 * i - 60 * 1000 * 15 * j)
                                    await fetch(ur + timeToString(thee, true))
                                        .then(response => response.text())
                                        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                                        .then(data => {
                                            let a = data.querySelectorAll("jtis_journey_list LOCATION_ID")
                                            for (let k = 0; k < a.length; k++) {
                                                if (a[k].textContent === LOCATION_ID && a[k].nextElementSibling.textContent === DESTINATION_ID) {
                                                    if (a[k].nextElementSibling.nextElementSibling.nextElementSibling.textContent === "1") {
                                                        data_list.unshift(parseInt(a[k].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent))
                                                        label_list.unshift(timeToString(thee, false))
                                                        break;
                                                    }
                                                }
                                            }
                                        }).catch(() => { })
                                    if ((i < 6) && j === 4) {
                                        data_list.unshift(NaN)
                                        label_list.unshift("")
                                    }
                                }
                            }
                        }
                        return ([label_list, data_list])
                    }
                    let tit = input_type === 0 ? 'Waiting time in the past 10 hours' : "Waiting time in this hour of past 7 days"
                    get_data(input_type).then((arr) => {
                        document.querySelector("#result").innerHTML = '<canvas id="myChart" width="400" height="200"></canvas>'
                        let ctx = document.getElementById('myChart');
                        new ch(ctx, {
                            type: 'line',
                            data: {
                                labels: arr[0],
                                datasets: [{
                                    label: tit,
                                    data: arr[1],
                                    fill: false,
                                    borderColor: 'rgb(75, 192, 192)',
                                    tension: 0
                                }]
                            },
                            options: {
                                interaction: {
                                    intersect: false,
                                },
                                scales: {
                                    y: {
                                        suggestedMin: 5,
                                        suggestedMax: 30,
                                        title: {
                                            display: true,
                                            text: 'Waiting time (in mins)'
                                        },
                                    },
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Time'
                                        },
                                    }
                                }
                            }
                        });
                    })
                } else {
                    document.querySelector("#result").innerHTML = "Wrong input"
                }
            }}>Check!</button>
            <div id="result">

            </div >
        </div >
    );
}
export default Chart;
