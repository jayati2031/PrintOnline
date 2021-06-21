var dbref = firebase.database().ref().child('/NewOrders');

    var repeat = document.getElementById("showRow");
    var tab = document.getElementsByClassName("ordersTable")[0];
    
    var totalProducts, i;
    var oIdArr = [];
    var oLabelArr = [];
    var onoOfPagesArr = [];
    var otypeOfPrintArr = [];
    var ototalArr = [];
    var ourlArr = [];
    var ouserEmailArr = [];
    var odateOrderedArr = [];
    var ouserIdArr = [];
    //var pUniqueLabel= [];
    var accept = "<a href=\"#\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#completionTime\" data-whatever=\"";
    var closeaccept = "\">Accept</a>";
    var reject = "<button class=\"btn btn-danger\" onclick=\"rejectOrder('";
    var closereject = "')\">Reject</button>";
    var variableA, variableR;
    var arrDet = [];
    var changedID, changedName, changedCharge, changedLabel;
    var selectLabel = document.getElementById("plabels");
    var addOption;

    var oid, ourl, oemail, olabel, otype, opage, ototal, odate, ouid;
    var j, list, k=0;
    dbref.once("value")
        .then(function(snapshot){
            totalProducts = snapshot.numChildren();
            //window.alert(totalProducts);
            i = totalProducts-1;
            snapshot.forEach(function(childSnapshot){

                oid = childSnapshot.child('orderID').val();
                ourl = childSnapshot.child('url').val();
                oemail = childSnapshot.child('userEmail').val();
                olabel = childSnapshot.child('label').val();
                otype = childSnapshot.child('typeOfPrint').val();
                opage = childSnapshot.child('noOfPages').val();
                ototal = childSnapshot.child('total').val();
                odate = childSnapshot.child('dateOrdered').val();
                ouid = childSnapshot.child('userId').val();

                j=totalProducts-i;

                if(oid!="OrderID"){
                    list = {
                        ID: oid,
                        indexN: j
                    };

                    oIdArr.push(oid);
                    oLabelArr.push(olabel);
                    onoOfPagesArr.push(opage);
                    ouserEmailArr.push(oemail);
                    otypeOfPrintArr.push(otype);
                    ourlArr.push(ourl);
                    ototalArr.push(ototal);
                    odateOrderedArr.push(odate);
                    ouserIdArr.push(ouid);
                    
                    arrDet.push(list);
                    variableA = accept + oid + closeaccept;
                    variableR = reject + oid + closereject;
                    //console.log(variable);
                    
                    var openLink = "<div class=\"card\"><a href=\"#\" class=\"btn btn-fix text-left\" data-toggle=\"modal\" data-target=\"#orderDetails\" id=\"orderlink\" data-whatever=\"";
                    var closeLink = "\"></a><p><span id=\"acpt\"></span><span id=\"rjct\"></span></p></div></div>";
                    document.getElementById("showRow").innerHTML = openLink + oid + closeLink;
                    document.getElementById("orderlink").innerHTML = "<div class=\"card-block \"><p class=\"card-title text-dark\" id=\"orderid\"></p><p class=\"card-text text-dark\" id=\"orderlabel\"></p><p class=\"card-text text-dark\" id=\"orderpages\"></p><p class=\"card-text text-dark\"><span id=\"ordertotal\"></span></p><p class=\"card-text text-dark\" id=\"orderdate\"></p>"
                    
                    // document.getElementById("spId").innerHTML = pid;

                    document.getElementById("orderid").innerHTML = oid;
                    document.getElementById("orderlabel").innerHTML = olabel;
                    document.getElementById("orderdate").innerHTML = odate;
                    document.getElementById("orderpages").innerHTML = opage + " pages";
                    document.getElementById("ordertotal").innerHTML = " " + ototal;
                    document.getElementById("acpt").innerHTML = variableA;
                    document.getElementById("rjct").innerHTML = variableR;

                    if((--i) && (k<2)){
                        //console.log(i);
                        var clone = repeat.cloneNode(true);
                        tab.appendChild(clone);
                        k++;
                    }
                }
            });
            
        });

        var dbrefp = firebase.database().ref().child('/PendingOrders');
        var totalPending;
        dbrefp.once("value")
        .then(function(snapshot){
            document.getElementById('preqs').innerHTML = snapshot.numChildren();
        });

$('#orderDetails').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    
    var x;
        
    for(x=0; x<totalProducts-1; x++){
        if(arrDet[x].ID === recipient){
            document.getElementById('showID').innerHTML = oIdArr[x];
            document.getElementById('showUser').innerHTML = ouserEmailArr[x];
            document.getElementById('showPrint').innerHTML = oLabelArr[x] + " - " + otypeOfPrintArr[x];
            document.getElementById('showTotal').innerHTML = " " + ototalArr[x];
            document.getElementById('showPages').innerHTML = onoOfPagesArr[x];
            document.getElementById('dateord').innerHTML = odateOrderedArr[x];
            }
        }
     
});

$('#completionTime').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever');
    var fcall = "acceptOrder('" + recipient + "')";
    var modal = $(this);

    for(x=0; x<totalProducts-1; x++){
        if(arrDet[x].ID === recipient){
            modal.find('.modal-footer #acceptOrder').attr('onclick', fcall);
        }
    }

})


function acceptOrder(oId){
    var k;
    var d = new Date();
    var dateAccept = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " " + d.toDateString();
    var dbreference = firebase.database().ref().child('/PendingOrders/'+ oId);
    var estimatedTime = document.getElementById("ett").value;
    var estimatedDate = document.getElementById("etd").value.split('-');
    var d2 = new Date(estimatedDate[0], estimatedDate[1]-1, estimatedDate[2]);
    var estimated = estimatedTime + " " + d2.toDateString();
    for(k=0; k<totalProducts-1; k++){
        
        if(arrDet[k].ID === oId){

            dbreference.set({
                label: oLabelArr[k],
                total: ototalArr[k],
                typeOfPrint: otypeOfPrintArr[k],
                orderID: oIdArr[k],
                url: ourlArr[k],
                userEmail: ouserEmailArr[k],
                userId: ouserIdArr[k],
                noOfPages: onoOfPagesArr[k],
                dateOrdered: odateOrderedArr[k],
                dateAccepted: dateAccept,
                dateEstimated: estimated,
                status: "accepted"
            });

            firebase.database().ref("UserOrders/").child(ouserIdArr[k]).child("Placed").child(oId).remove();
            console.log("Order status: Accepted");

            firebase.database().ref("UserOrders/" + ouserIdArr[k] + "/Accepted/" + oId).set({
                label: oLabelArr[k],
                total: ototalArr[k],
                typeOfPrint: otypeOfPrintArr[k],
                orderID: oIdArr[k],
                url: ourlArr[k],
                userEmail: ouserEmailArr[k],
                userId: ouserIdArr[k],
                noOfPages: onoOfPagesArr[k],
                dateOrdered: odateOrderedArr[k],
                dateAccepted: dateAccept,
                dateEstimated: estimated,
                status: "accepted"
            }, function(error){
                if(error)
                    window.alert(error.code);
            });

            console.log("Order accepted!");

            dbref.child(oId).remove();
            console.log("Order Accepted!!");
            location.reload();
        
        }
    }
}

function rejectOrder(oId){
    var k;
    var d = new Date();
    var dateReject = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " " + d.toDateString();
    var dbreference = firebase.database().ref().child('/RejectedOrders/'+ oId);
    for(k=0; k<totalProducts-1; k++){
        
        if(arrDet[k].ID === oId){

            dbreference.set({
                label: oLabelArr[k],
                total: ototalArr[k],
                typeOfPrint: otypeOfPrintArr[k],
                orderID: oIdArr[k],
                url: ourlArr[k],
                userId: ouserIdArr[k],
                userEmail: ouserEmailArr[k],
                noOfPages: onoOfPagesArr[k],
                dateOrdered: odateOrderedArr[k],
                dateRejected: dateReject,
                status: "rejected"
            });

            firebase.database().ref("UserOrders/").child(ouserIdArr[k]).child("Placed").child(oId).remove();
            console.log("Order status: Accepted");

            firebase.database().ref("UserOrders/" + ouserIdArr[k] + "/Rejected/" + oId).set({
                label: oLabelArr[k],
                total: ototalArr[k],
                typeOfPrint: otypeOfPrintArr[k],
                orderID: oIdArr[k],
                url: ourlArr[k],
                userEmail: ouserEmailArr[k],
                userId: ouserIdArr[k],
                noOfPages: onoOfPagesArr[k],
                dateOrdered: odateOrderedArr[k],
                dateRejected: dateReject,
                status: "rejected"
            }, function(error){
                if(error)
                    window.alert(error.code);
            });

            console.log("Order Rejected!");

            dbref.child( arrDet[k].ID).remove();
            console.log("Order Rejected!!");
            location.reload();
        
        }
    }
}