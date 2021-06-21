 var dbref = firebase.database().ref().child('/Products');
    var repeat = document.getElementById("showRow");
    var tab = document.getElementsByClassName("productsTable")[0];
    
    var totalProducts, i;
    var pIdArr = [];
    var pNameArr = [];
    var pChargeArr = [];
    var pLabelArr = [];
    var pUniqueLabel= [];
    var arrDet = [];
    var arrLabel = [];
    var changedID, changedName, changedCharge, changedLabel;
    var selectLabel = document.getElementById("plabels");
    var addOption;

    var pid, pname, pcharge;
    var j, list, lab;
    dbref.once("value")
        .then(function(snapshot){
            totalProducts = snapshot.numChildren();
            //window.alert(totalProducts);
            i = totalProducts-1;
            snapshot.forEach(function(childSnapshot){

                pid = childSnapshot.child('pID').val();
                pname = childSnapshot.child('productName').val();
                pcharge = childSnapshot.child('charge').val();
                pLabel = childSnapshot.child('label').val();

                j=totalProducts-i;

                if(pid!="IDOfProduct"){
                    list = {
                        ID: pid,
                        label: pLabel,
                        indexN: j
                    };
                    pIdArr.push(pid);
                    pNameArr.push(pname);
                    pChargeArr.push(pcharge);
                    pLabelArr.push(pLabel);
                    
                    arrDet.push(list);
                    
                    //console.log(variable);
                    
                    --i;
                    if(jQuery.inArray(pLabel, pUniqueLabel) == -1){
                        
                        pUniqueLabel.push(pLabel);
                        lab = {
                            label: pLabel,
                            indexI: j
                        };
                        arrLabel.push(lab);
                    }
                    
                }
            });

            i=pUniqueLabel.length;
            variableP = '';

            pUniqueLabel.forEach(function(value){
                var buy = "<button href=\"#\" class=\"btn btn-success\" onclick=\"showModal(";
                var closeBuy = ")\">Print</button>";
                var val;
                //document.getElementById("showRow").innerHTML = buy+ "2"+ closeBuy;
                document.getElementById("showRow").innerHTML = "<div class=\"card\"><div class=\"card-block\"><p class=\"card-title text-dark\" id=\"LabelName\"></p><span id=\"printbtn\"></span></div></div>";
                 arrLabel.forEach(function(v){
                     if(v.label === value){
                         val = v.indexI;
                     }
                 })
                variableP = buy+val+closeBuy;
                document.getElementById("LabelName").innerHTML = value;
                document.getElementById("printbtn").innerHTML = variableP;
                
                if(--i){
                    console.log(i);
                    var clone = document.getElementById("showRow").cloneNode(true);
                    document.getElementsByClassName("productsTable")[0].appendChild(clone);
                   }
            });

        });
var pin;
var selectLabel = document.getElementById("top");
var addOption, selectedFile, printLabel, printType, totalAmount, count;
var progressBar = document.getElementById('fileProgress');

$(document).ready(function(){
    $("#orderPrint").hide();
});



function showModal(indexP){
    pin = indexP;
    console.log(arrLabel);
    $('#buyProduct').modal("show");
}

$('#buyProduct').on('show.bs.modal', function(event){
    
    var modal = $(this);
    var y = pin, x, z;
    console.log(y);
    var options = "";
    var recipient = "placeOrder("+y.toString()+")";
    
        for(x=0; x<arrLabel.length; x++){
            if(arrLabel[x].indexI === y){
                
                for(z=0; z<totalProducts-1; z++){
                        if(arrLabel[x].label === arrDet[z].label){
                            printLabel = arrLabel[x].label;
                            options +="<option" + " value=" + z + ">" + pNameArr[z] + " - "  + pChargeArr[z] + "</option>";
                        }
                    }
            }
        }
        document.getElementById("top").innerHTML = options;

        $("#file").on("change", function(){
            
            var input = document.getElementById("file");
            var reader = new FileReader();
            selectedFile = input.files[0];
            $("#orderPrint").show();
            $('#top').click(function(){
                var type = document.getElementById("top").value;
                var charge = pChargeArr[type];
                printType = pNameArr[type];
                reader.readAsBinaryString(input.files[0]);
                reader.addEventListener('load', function(){
                    count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                    document.getElementById("nop").value = count;
                    totalAmount = charge * count;
                    document.getElementById("total").value = totalAmount;
                    $("#orderPrint").prop('disabled',false);
                });
            })
            
            $("#orderPrint").attr('onclick', recipient);
        });
    

});

function placeOrder(){
    $('#fileProgress').show();
    var user = firebase.auth().currentUser;
    var filename = selectedFile.name;
    var d = new Date();
    var fileDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + d.getHours() + "-" + d.getMinutes() + d.getSeconds(); 
    var dateOrder = d.toDateString() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var orderId = fileDate + user.uid;

    var storageRef = firebase.storage().ref();
    var fileRef = storageRef.child(user.email);

    var metadata = {
        dateUploaded: fileDate,
        name: filename
    };

    var uploadTask = fileRef.child(filename+fileDate).put(selectedFile, metadata);
        console.log(uploadTask);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.value = progress;
            progressBar.innerHTML = progress;
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

        switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
                console.log("storage/unauthorized");
                break;

            case 'storage/canceled':
            // User canceled the upload
                console.log('storage/canceled');
                break;

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
                console.log('storage/unknown');
                break;
        }
        }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
                firebase.database().ref("NewOrders/" + orderId).set({
                orderID: orderId,
                url: downloadURL,
                label: printLabel,
                noOfPages: count,
                typeOfPrint: printType,
                total: totalAmount,
                userEmail: user.email,
                userId: user.uid,
                dateOrdered: dateOrder,
                status: "placed"
            }, function(error){
                if(error)
                    window.alert(error.code);
                else{
                    firebase.database().ref("UserOrders/" + user.uid + "/Placed/" + orderId).set({
                        orderID: orderId,
                        url: downloadURL,
                        label: printLabel,
                        noOfPages: count,
                        typeOfPrint: printType,
                        total: totalAmount,
                        userEmail: user.email,
                        dateOrdered: dateOrder,
                        status: "placed"
                    }, function(error){
                        if(error)
                            window.alert(error.code);
                        else{
                            window.alert("Order placed successfully");
                            console.log('File available at', downloadURL);
                            location.reload();
                        }
                    });
                }
            });
        });
    });
}