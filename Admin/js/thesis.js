
var dbref = firebase.database().ref().child('/Thesis');
var repeat = document.getElementById("showRow");
var tab = document.getElementsByClassName("thesisTemplates")[0];

var totalProducts, i;
var tIdArr = [];
var tCoverArr = [];
var tCoverChargeArr = [];
var tbwChargeArr = [];
var tcpChargeArr = [];
var tUrlArr = [];
var del = "<button class=\"btn btn-danger\" onclick=\"deleteTemplate(";
var closedel = ")\">Delete</button>";
var edit = "<a href=\"#\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#editTemplate\" data-whatever=\"editTemplate(";
var closeEdit = ")\">Edit</a>";
var imgsrc="<img src=\"";
var imgclose = "\">";
var variableD, variableE, variableI;
var arrDet = [];
var changedID, changedCover, changedCoverCharge, changedbwCharge, changedcpCharge, changedosp, changedtsp;

var tid, tcover, tcharge, turl;
var j, list;
dbref.once("value")
    .then(function(snapshot){
        totalProducts = snapshot.numChildren();
        //window.alert(totalProducts);
        i = totalProducts-1;
        snapshot.forEach(function(childSnapshot){
            tid = childSnapshot.child('tID').val();
            tcover = childSnapshot.child('coverType').val();
            tcovercharge = childSnapshot.child('coverCharge').val();
            turl = childSnapshot.child('url').val();
            tbwcharge = childSnapshot.child('bwCharge').val();
            tcpcharge = childSnapshot.child('cpCharge').val();
    
            j=totalProducts-i;

            if(tid!="TemplateID"){
                list = {
                    ID: tid,
                    indexN: j
                };
                tIdArr.push(tid);
                tCoverArr.push(tcover);
                tCoverChargeArr.push(tcovercharge);
                tUrlArr.push(turl);
                tbwChargeArr.push(tbwcharge);
                tcpChargeArr.push(tcpcharge);
                arrDet.push(list);
                variableD = del+j+closedel;
                variableE = edit+j+closeEdit;
                variableI = imgsrc+turl+imgclose;
                //console.log(variable);
                document.getElementById("showRow").innerHTML = "<div class=\"card\"><div class=\"card-block\"><span id=\"coverImage\"></span><p class=\"card-title text-dark\" id=\"stCover\"></p><span class=\"card-text text-dark text-sm\">&#8377&ensp;</span><span class=\"card-text text-dark text-sm\" id=\"stCharge\"></span><span id=\"editbtn\"></span><span id=\"dltbtn\"></span></div></div>";
                // document.getElementById("spId").innerHTML = pid;

                document.getElementById("stCover").innerHTML = tcover;
                document.getElementById("stCharge").innerHTML = tcovercharge;
                document.getElementById("editbtn").innerHTML = variableE;
                document.getElementById("dltbtn").innerHTML = variableD;
                document.getElementById("coverImage").innerHTML = variableI;

                if(--i){
                    //console.log(i);
                    var clone = repeat.cloneNode(true);
                    tab.appendChild(clone);
                }
            }
        });
        
    });



var selectedFile;

$(document).ready(function(){
    $("#uploadbutton").hide();
});

$("#file").on("change", function(event){
    selectedFile = event.target.files[0];
    $("#uploadbutton").show();
});


function uploadfile(){

    var tId = document.getElementById('tid').value;

    var filename = selectedFile.name;
    var storageRef = firebase.storage().ref('/ThesisTemplates');
    console.log(storageRef);
    var fileRef = storageRef.child(filename);
    console.log(fileRef);
    var uploadTask = fileRef.put(selectedFile);
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
          console.log('Error occured '+ error.code);
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.database().ref("Thesis/"+tId).set({
                url: downloadURL,
                tID: $("#tid").val(),
                coverType: $("#covertype").val(),
                bwCharge: $('#bwcharge').val(),
                cpCharge: $('#cpcharge').val(),
                coverCharge: $('#tcharge').val(),
                ospCharge: $('#ospcharge').val(),
                tspCharge: $('#tspcharge').val()
            }, function(error){
                if(error)
                    window.alert(error.code);
                else{
                    window.alert("Template uploaded successfully");
                    console.log('File available at', downloadURL);}
          location.reload();
        });
    });
      });
}

function deleteTemplate(indexP){
    var k;
    
    for(k=0; k<totalProducts-1; k++){
        
        if(arrDet[k].indexN === indexP){

            dbref.child(arrDet[k].ID).remove();
            window.alert("Template deleted successfully!!");
            location.reload();
        
        }
    }
}

function editTemplate(indexP){
    var k;
    
    for(k=0; k<totalProducts-1; k++){
        
        if(arrDet[k].indexN === indexP){

            changedID = $('#etid').val();
            //window.alert(changedID);
            changedCover = $('#ecovertype').val();
            //window.alert(changedName);
            changedCoverCharge = $('#etcharge').val();
            changedbwCharge = $('#ebwcharge').val();
            changedcpCharge = $('#ecpcharge').val();
            changedosp = $('#eospcharge').val();
            changedtsp = $('#etspcharge').val();
            //window.alert(changedID+changedCover+changedCoverCharge+changedbwCharge+changedcpCharge);
//             changedUrl = document.getElementById("coverImage").value;
            
            dbref.child(arrDet[k].ID).remove();
            arrDet[k].ID = changedID;
            dbref.child(arrDet[k].ID).set({
                url: tUrlArr[k],
                tID: changedID,
                coverType: changedCover,
                bwCharge: changedbwCharge,
                cpCharge: changedcpCharge,
                coverCharge: changedCoverCharge,
                ospCharge: changedosp,
                tspCharge: changedtsp
            
            });
//             // dbref.child(arrDet[k].ID).set(changedID);
            window.alert("Product edited successfully!!");
            location.reload;

        }
    }
}

$('#editTemplate').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    var y = parseInt(recipient.charAt(13)), x;

    for(x=0; x<totalProducts-1; x++){
        if(arrDet[x].indexN === y){
            modal.find('.modal-footer #updtTmplt').attr('onclick', recipient);
            modal.find('.modal-body #efile').attr('value', tUrlArr[x]);
            modal.find('.modal-body #ecovertype').attr('value', tCoverArr[x]);
            modal.find('.modal-body #ebwcharge').attr('value', tbwChargeArr[x]);
            modal.find('.modal-body #ecpcharge').attr('value', tcpChargeArr[x]);
            modal.find('.modal-body #etcharge').attr('value', tCoverChargeArr[x]);
            modal.find('.modal-body #etid').attr('value', tIdArr[x]);
        }
    }

})