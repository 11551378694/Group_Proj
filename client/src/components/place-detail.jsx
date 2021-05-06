import React from "react";

export default class PlaceDetails extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            lng: this.props.lng,
			lat: this.props.lat,
            name: this.props.name,
            locationId : this.props.locationId,
            placeInfo : []
        }
    }

    async componentDidMount(){
        
        async function getDataFromPastHours(hours, locationId){
            let timeNow = new Date().getTime();
            let timeNowInExactMins = timeNow - timeNow%60000;
            let loopCounter = hours * 60;
            let month = {"January":"01","February":"02","March":"03","April":"04","May":"05","June":"06",
                  "July":"07","August":"08","September":"09","October":"10","November":"11","December":"12"};
            let formattedData = []; // store the data in the readable format fetched from the api 
            //convert the raw data into readable format
            for (let counter = 0 ;counter < loopCounter; counter+=2){
              let timeInExactMins = new Date(timeNowInExactMins - counter*60000).toString().split(" ");
              let timeInSixDigits = timeInExactMins[4].split(":");
              let timeString = timeInExactMins[3]+month[timeInExactMins[1]]+timeInExactMins[2]+"-"+timeInSixDigits[0]+timeInSixDigits[1];
              await fetchData(formattedData,locationId,timeString);
                
            }
             let result  = processData(formattedData);
              return result;
        }
        async function fetchData(formattedData,locationId,timeString){
            let historicalPath = 'https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fresource.data.one.gov.hk%2Ftd%2Fjourneytime.xml&time='+timeString;
            await fetch('https://resource.data.one.gov.hk/td/journeytime.xml')
            .then(res=>res.text())
            .then(data => {
                let parser = new DOMParser();
                let xml = parser.parseFromString(data,'text/xml');
                let places = xml.getElementsByTagName('jtis_journey_time');
                
                
                for (let i=0;i<places.length;i++){
                  if(places[i].childNodes[1].childNodes[0].data == locationId && places[i].childNodes[7].childNodes[0].data == "1"){
                        formattedData.push({
                                locationID: places[i].childNodes[1].childNodes[0].data,
                                destinationID: places[i].childNodes[3].childNodes[0].data,
                                captureDate: places[i].childNodes[5].childNodes[0].data,
                                journeyType: places[i].childNodes[7].childNodes[0].data,
                                journeyData: Number(places[i].childNodes[9].childNodes[0].data),
                                colorID: places[i].childNodes[11].childNodes[0].data

                        });
                      }
                }
                
          })
          .catch(err=>{console.log('there is no data at '+timeString )});

}



    async function processData(formattedData){
        let destinationInformation = { 
        "CH" : { "id":"CH","name": "Cross Harbour Tunnel" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""},
        "EH" : { "id":"EH","name" : "Eastern Harbour Crossing " , "journeyData":0 , "colorId":0, "count":0,"captureDate":""},
        "WH" : { "id":"WH","name" :"Western Harbour Crossing" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""},
        "LRT" : { "id":"LRT","name" : "Lion Rock Tunnel" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""},
        "SMT" : { "id":"SMT","name" :"Shing Mun Tunnel" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""},
        "TCT" : { "id":"TCT","name" :"Tate\'s Cairn Tunnel" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""},
        "TKTL" :{  "id":"TKTL","name" :"Ting Kau, via Tai Lam Tunnel" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""}, 
        "TKTM" : { "id":"TKTM","name" :"Ting Kau, via Tuen Mun Road" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""}, 
        "TSCA" : { "id":"TSCA","name" :"Tsing Sha Control Area" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""}, 
        "TWCP" : { "id":"TWCP","name" :"Tsuen Wan via Castle Peak" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""}, 
        "TWTM" : { "id":"TWTM","name" :"Tsuen Wan via Tuen Mun" , "journeyData":0 , "colorId":0, "count":0,"captureDate":""},
    }

   for (let i=0;i<formattedData.length;i++){
     let id = formattedData[i].destinationID;
     destinationInformation[id].journeyData += formattedData[i].journeyData;
     destinationInformation[id].count += 1;
     destinationInformation[id].captureDate = formattedData[i].captureDate;
     console.log(formattedData[i].colorID)
     destinationInformation[id].colorId = formattedData[i].colorID;
     console.log(destinationInformation[id].colorId)
     
     
   }

   return destinationInformation;
}
    let data = await getDataFromPastHours(0.02,this.state.locationId);
    let usefulData = [];
    for (let destination in data){
        if(data[destination].count >=1)
            {
                
                usefulData.push(data[destination]);
            }
    }
    this.setState({placeInfo:usefulData});
   
    

    }

    render(){
        return(
            <div>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#placedetails" aria-expanded="false" aria-controls="placedetails">
            {this.state.name}
            </button>
            <div class="collapse" id="placedetails">
            <ul class="list-group">
                <li class="list-group-item">locationID : {this.state.locationId}</li>
                <li class="list-group-item">Latitude : {this.state.lat}</li>
                <li class="list-group-item">Longitude : {this.state.lng}</li>
                <li class="list-group-item">
                    <table>
                    <caption style={{captionSide:"top"}}>Lastest Road Condition</caption>
                        <thead>
                            <tr>
                                <th>destinationID</th>
                                <th>destination</th>
                                <th>average waiting time</th>
                                <th>traffic condition</th>
                                <th>capture date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.placeInfo.length==0 && <tr><th>loading</th><th>loading</th>
                        <th>loading</th><th>loading</th><th>loading</th></tr>
                        }
                        {   
                            this.state.placeInfo.map((destination,index)=>(
                                <tr key={index}>
                                <td>{destination.id}</td>
                                <td>{destination.name}</td>
                                <td>{destination.journeyData}</td>
                                <td>{destination.colorId == "1" ? <span>&#128308;</span>: destination.colorId == "2" ? <span>&#128993;</span> : <span>&#128994;</span>}</td>
                                <td>{destination.captureDate}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </li>
            </ul>
            </div>
               
            </div>
        );
    }
}