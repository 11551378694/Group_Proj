import React from "react";
import { Chart as ch, registerables } from 'chart.js';
ch.register(...registerables);

const Chart = () => {
    let start_list = ["H1", "H2", "H3", "H11", "K01", "K02", "K03", "K04", "K05", "K06", "SJ1", "SJ2", "SJ3", "SJ4", "SJ5"]
    let end_list = ["CH", "EH", "WH", "LRT", "SMT", "TCT", "TKTL", "TKTM", "TSCA", "TWCP", "TWTM"]
    return (
        <div className="container">
            <label for="LOCATION_ID">LOCATION ID: </label>
            <select name="LOCATION_ID" id="input_LOCATION_ID">
                {start_list.map((value, index) => {
                    return (<option value="value" key={index}>{value}</option>)
                })}
            </select>
            <label for="DESTINATION_ID">DESTINATION ID: </label>
            <select name="DESTINATION_ID" id="input_DESTINATION_ID">
                {end_list.map((value, index) => {
                    return (<option value="value" key={index}>{value}</option>)
                })}
            </select>
            <div>{"(Some pair of Location ID and Destination ID is not valid)"} </div>
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
                let DESTINATION_ID = end_list[document.querySelector("#input_DESTINATION_ID").selectedIndex]
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
                    const getXML = async (input_type) => {
                        document.querySelector("#result").innerHTML = "Loading"
                        const labels = []
                        const da = []
                        if (input_type === 0) {
                            let noww = new Date()
                            for (let j = 0; j < 10; j++) {
                                for (let jj = 0; jj < 4; jj++) {
                                    let thee = new Date((noww.getTime()) - 60 * 1000 * 60 * j - 60 * 1000 * 15 * jj)
                                    let ur = "https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fresource.data.one.gov.hk%2Ftd%2Fjourneytime.xml&time="
                                    ur = ur + timeToString(thee, true)
                                    await fetch(ur)
                                        .then(response => response.text())
                                        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                                        .then(data => {
                                            let a = data.querySelectorAll("jtis_journey_list LOCATION_ID")
                                            //let b = data.querySelectorAll("DESTINATION_ID")
                                            for (let i = 0; i < a.length; i++) {
                                                if (a[i].textContent === LOCATION_ID && a[i].nextElementSibling.textContent === DESTINATION_ID) {
                                                    //let c = data.querySelectorAll("JOURNEY_TYPE")
                                                    if (a[i].nextElementSibling.nextElementSibling.nextElementSibling.textContent === "1") {
                                                        //let d = data.querySelectorAll("JOURNEY_DATA")
                                                        //let f = data.querySelectorAll("CAPTURE_DATE")
                                                        //da.unshift(parseInt(d[i].textContent))
                                                        da.unshift(parseInt(a[i].nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent))
                                                        labels.unshift(timeToString(thee, false))
                                                        break;
                                                    }
                                                }
                                            }
                                        }).catch(() => { })
                                }
                            }
                        }
                        return ([labels, da])
                    }
                    getXML(input_type).then((arr) => {
                        document.querySelector("#result").innerHTML = '<canvas id="myChart" width="400" height="200"></canvas>'
                        let ctx = document.getElementById('myChart');
                        new ch(ctx, {
                            type: 'line',
                            data: {
                                labels: arr[0],
                                datasets: [{
                                    label: 'Waiting time in the past 10 hours (in mins)',
                                    data: arr[1],
                                    fill: false,
                                    borderColor: 'rgb(75, 192, 192)',
                                    tension: 0
                                }]
                            },
                            options: {
                                scales: {
                                    y: {
                                        suggestedMin: 5,
                                        suggestedMax: 30
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