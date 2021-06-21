var dbref = firebase.database().ref().child('/Thesis');
var repeat = document.getElementById("showRow");
var tab = document.getElementsByClassName("productsTable")[0];
    
    var totalProducts1, totalProducts2, totalProducts = 0, i;
    var tcpChargeArr = [];
    var tbwChargeArr = [];
    var tChargeArr = [];
    var tCoverArr = [];
    var tIDArr = [];
    var tUrlArr = [];
    var tOspArr = [];
    var tTspArr = [];

    var arrDet = [];
    var changedID, changedName, changedCharge, changedLabel;
    var selectLabel = document.getElementById("plabels");
    var addOption;

    var tid, tcp, tbw, tcharge, turl, tcover, osp, tsp;
    var j, list;

    
    dbref.once("value")
        .then(function(snapshot){
            totalProducts = snapshot.numChildren();
            
            //window.alert(totalProducts);
            
            i = totalProducts-1;

            snapshot.forEach(function(childSnapshot){
                    tid = childSnapshot.child('tID').val();
                    turl = childSnapshot.child('url').val();
                    tcover = childSnapshot.child('coverType').val();
                    tbw = childSnapshot.child('bwCharge').val();
                    tcp = childSnapshot.child('cpCharge').val();
                    tcharge = childSnapshot.child('coverCharge').val();
                    tsp = childSnapshot.child('tspCharge').val();
                    osp = childSnapshot.child('ospCharge').val();

                    j=totalProducts-i;

                    if(tid!="TemplateID"){
                        list = {
                            ID: tid,
                            indexN: j
                        };

                        tIDArr.push(tid);
                        tUrlArr.push(turl);
                        tCoverArr.push(tcover);
                        tbwChargeArr.push(tbw);
                        tcpChargeArr.push(tcp);
                        tChargeArr.push(tcharge);
                        tOspArr.push(osp);
                        tTspArr.push(tsp);
                        
                        arrDet.push(list);
                        //console.log(variable);
                        
                        var openLink = "<div class=\"card\"><a href=\"#\" class=\"btn btn-fix text-left\" id=\"thesislink\" onclick=\"showModal(\'";
                        var closeLink = "\')\"></a></div></div>";
                        
                        document.getElementById("showRow").innerHTML = openLink + j + closeLink;
                        document.getElementById("thesislink").innerHTML = "<div class=\"card-block \"><img id=\"covimg\"><p class=\"card-title text-dark font-weight-bold h5\" id=\"covertype\"></p><p class=\"card-text text-dark\">Cover Price: <span>&#8377; </span></span><span id=\"coverprice\"></p><p class=\"card-text text-dark\">Black and white print: <span>&#8377; </span><span id=\"bwprice\"></span> per page</p><p class=\"card-text text-dark\">Color print: <span>&#8377; </span><span id=\"cprice\"></span> per page</p><p class=\"card-text text-dark\" id=\"orderdate\"></p>"
                        
                        // document.getElementById("spId").innerHTML = pid;
                        document.getElementById("covimg").setAttribute("src", turl);
                        document.getElementById("covertype").innerHTML = tcover;
                        document.getElementById("coverprice").innerHTML = tcharge;
                        document.getElementById("bwprice").innerHTML = tbw;
                        document.getElementById("cprice").innerHTML = tcp;

                        if(--i){
                            // console.log(i);
                            var clone = repeat.cloneNode(true);
                            tab.appendChild(clone);
                        }
                    }
            });
            
        });

var pin;
var selectLabel = document.getElementById("top"), flag = 0;
var addOption, selectedFile, printLabel, printType, totalAmount = 0, count;
var progressBar = document.getElementById('fileProgress');

$(document).ready(function(){
    $("#orderPrint").hide();
});

function showModal(idIndex){
    pin = idIndex;
    $('#buyThesis').modal("show");
}

$('#buyThesis').on('show.bs.modal', function(event){

    var modal = $(this);
    var y = pin, x, z;
    var recipient = "placeOrder("+y.toString()+")";
        $("#file").on("change", function(){
            
            printLabel = "(Thesis)" + tCoverArr[y-1];
            var input = document.getElementById("file");
            var reader = new FileReader();
            var type = "One-sided", type2 = "Color";
            selectedFile = input.files[0];
            $("#orderPrint").show();
            $('#topside').on("change", function(){
                type = document.getElementById("topside").value;
                var charge = 0;
                    if(type === "One-sided"){
                        if(type2 === "Color"){
                            charge = tOspArr[y-1] * tcpChargeArr[y-1];
                        }
                        if(type2 === "Black and white"){
                            charge = tOspArr[y-1] * tbwChargeArr[y-1];
                        }
                    }
                    if(type === "Two-sided"){
                        if(type2 === "Color"){
                            charge = tTspArr[y-1] * tcpChargeArr[y-1];
                        }
                        if(type2 === "Black and white"){
                            charge = tTspArr[y-1] * tbwChargeArr[y-1];
                        }
                    }
                    reader.readAsBinaryString(input.files[0]);
                    reader.addEventListener('load', function(){
                        count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                        document.getElementById("nop").value = count;
                        totalAmount = +tChargeArr[y-1] + charge*count;
                        document.getElementById("total").value = totalAmount;
                        $("#orderPrint").prop('disabled',false);
                    });
                    printType = type + " - " + type2;
                });
            $('#topcol').on("change", function(){
                type2 = document.getElementById("topcol").value;
                var charge = 0;
                    if(type === "One-sided"){
                        if(type2 === "Color"){
                            charge = tOspArr[y-1] * tcpChargeArr[y-1];
                        }
                        if(type2 === "Black and white"){
                            charge = tOspArr[y-1] * tbwChargeArr[y-1];
                        }
                    }
                    if(type === "Two-sided"){
                        if(type2 === "Color"){
                            charge = tTspArr[y-1] * tcpChargeArr[y-1];
                        }
                        if(type2 === "Black and white"){
                            charge = tTspArr[y-1] * tbwChargeArr[y-1];
                        }
                    }
                    reader.readAsBinaryString(input.files[0]);
                    reader.addEventListener('load', function(){
                        count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                        document.getElementById("nop").value = count;
                        totalAmount = +tChargeArr[y-1] + charge*count;
                        document.getElementById("total").value = totalAmount;
                        $("#orderPrint").prop('disabled',false);
                    });
                    printType = type + " - " + type2;

                })
            });

                $("#orderPrint").attr('onclick', recipient);
            });
               
    
function placeOrder(idthesis){
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