$(document).ready(function(){
//Firebase initialization
var config = {
    apiKey: "AIzaSyDVWpDQ_V0TeOgf5OmkDgdwMr5G6lwSVAA",
    authDomain: "rcb-rps.firebaseapp.com",
    databaseURL: "https://rcb-rps.firebaseio.com",
    storageBucket: "rcb-rps.appspot.com",
    messagingSenderId: "235476200662"
  };
  firebase.initializeApp(config);
  
//VARIABLES==========================================
  var database = firebase.database();

  $('#trainInfo').on('click', function(){

	var trainName = $('#tName').val().trim();
  	var trainDest = $('#tDest').val().trim();
  	var trainFirst = moment($('#tFirst').val().trim()).format("HHmm");
  	var trainFreq = $('#tFreq').val().trim();

	var newTrain = {
		trainName: trainName,
		trainDest: trainDest,
		trainFirst: trainFirst,
		trainFreq: trainFreq
	}

	database.ref().push(newTrain);

	$('#tName').val("");
	$('#tDest').val("");
	$('#tFirst').val("");
	$('#tFreq').val("");			
  	
  	return false;
  });

  database.ref().on("child_added", function(snapshot, prevChildKey){
  	  	
  	var trainName = snapshot.val().trainName;
  	var trainDest = snapshot.val().trainDest;
  	var trainFirst = snapshot.val().trainFirst;
  	var trainFreq = snapshot.val().trainFreq;

   	var diffTime  = moment().diff(moment(trainFirst), "minutes");
  	
  	var tRemainder = diffTime%trainFreq;

  	var tMinutesTillTrain = trainFreq - tRemainder;

  	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  	
  	var displayNextTrain = moment(nextTrain).format("hh:mm");
  	
  	$("#trainSched").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + displayNextTrain + "</td><td>" + tMinutesTillTrain + "</div></td></tr>");
	
  });

});