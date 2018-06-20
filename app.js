var config = {
    apiKey: "AIzaSyAlxHYtL_LfEg1HA90KnW7aAesUQHujofI",
    authDomain: "homework-7-trains.firebaseapp.com",
    databaseURL: "https://homework-7-trains.firebaseio.com",
    projectId: "homework-7-trains",
    storageBucket: "homework-7-trains.appspot.com",
    messagingSenderId: "715888389392"
  };
  firebase.initializeApp(config);

  var trainData=firebase.database();

$("#addTrainButton").on("click", function(){
    var trainName =$("#trainNameInput").val().trim();
    var destination =$("#destinationInput").val().trim();
    var firstTrain =moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("X");
    var frequency =$("#frequencyInput").val().trim();

    console.log(firstTrain);


    var newTrain ={
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

    trainData.ref().push(newTrain);

    

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false


})

trainData.ref().on("child_added",function(snapshot){
    var name= snapshot.val().name;
    var destination=snapshot.val().destination;
    var frequency= snapshot.val().frequency;
    var firstTrain=snapshot.val().firstTrain;


    var remainder= moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh.mm A");
    


    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+ name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>"+ arrival + "</td><td>"+ minutes + "</td></tr>");
})