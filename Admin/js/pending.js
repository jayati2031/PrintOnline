var dbref = firebase.database().ref().child('/PendingOrders');

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
    var odateAcceptedArr = [];
    var odateEstimatedArr = [];
    var ouserIdArr = [];
    //var pUniqueLabel= [];
    var openf = "<a target=\"_blank\" class=\"btn btn-success\" href=\"";
    var closeopen = "\">Open File</button>";
    var mark = "<button class=\"btn btn-primary\" onclick=\"markasDone('";
    var closemark = "')\">Mark as Done</button>";
    var variableM, variableD;
    var arrDet = [];
    
    var oid, ourl, oemail, olabel, otype, opage, ototal, odatea, odateo, odatee, ouid;
    var j, list;
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
                odatea = childSnapshot.child('dateAccepted').val();
                odateo = childSnapshot.child('dateOrdered').val();
                odatee = childSnapshot.child('dateEstimated').val();
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
                    odateAcceptedArr.push(odatea);
                    odateOrderedArr.push(odateo);
                    odateEstimatedArr.push(odatee);
                    ouserIdArr.push(ouid);
                    
                    arrDet.push(list);
                    variableD = openf + ourl + closeopen;
                    variableM = mark + oid + closemark;
                    //console.log(variable);
                    
                    var openLink = "<div class=\"card\"><a href=\"#\" class=\"btn btn-fix text-left\" data-toggle=\"modal\" data-target=\"#orderDetails\" id=\"orderlink\" data-whatever=\"";
                    var closeLink = "\"></a><p><span id=\"open\"></span><span id=\"mark\"></span></p></div></div>";
                    document.getElementById("showRow").innerHTML = openLink + oid + closeLink;
                    document.getElementById("orderlink").innerHTML = "<div class=\"card-block \"><p class=\"card-title text-dark\" id=\"orderid\"></p><p class=\"card-text text-dark\" id=\"orderlabel\"></p><p class=\"card-text text-dark\" id=\"orderpages\"></p><p class=\"card-text text-dark\" id=\"orderdate\"></p><p class=\"card-text text-dark\"><i class=\"fa fa-inr\"></i><span id=\"ordertotal\"></span></p>"
                    
                    // document.getElementById("spId").innerHTML = pid;

                    document.getElementById("orderid").innerHTML = oid;
                    document.getElementById("orderlabel").innerHTML = olabel;
                    document.getElementById("orderdate").innerHTML = odateo;
                    document.getElementById("orderpages").innerHTML = opage + " pages";
                    document.getElementById("ordertotal").innerHTML = " " + ototal;
                    document.getElementById("mark").innerHTML = variableM;
                    document.getElementById("open").innerHTML = variableD;

                    if(--i){
                        //console.log(i);
                        var clone = repeat.cloneNode(true);
                        tab.appendChild(clone);
                    }
                }
            });
            
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
            document.getElementById('dateacc').innerHTML = odateAcceptedArr[x];
            document.getElementById('dateord').innerHTML = odateOrderedArr[x];
            document.getElementById('datecom').innerHTML = odateEstimatedArr[x];
            }
        }
     
});

function markasDone(oId){
    var k;
    var d = new Date();
    var dateMarked = d.toDateString() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    
    var dbreference = firebase.database().ref().child('/CompletedOrders/'+ oId);
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
                dateDone: dateMarked,
                dateOrdered: odateOrderedArr[k],
                dateAccepted: odateAcceptedArr[k],
                status: "completed"
            });

            firebase.database().ref("UserOrders/").child(ouserIdArr[k]).child("Accepted").child(oId).remove();
            console.log("Order status: Accepted");

            firebase.database().ref("UserOrders/" + ouserIdArr[k] + "/Completed/" + oId).set({
                label: oLabelArr[k],
                total: ototalArr[k],
                typeOfPrint: otypeOfPrintArr[k],
                orderID: oIdArr[k],
                url: ourlArr[k],
                userEmail: ouserEmailArr[k],
                userId: ouserIdArr[k],
                noOfPages: onoOfPagesArr[k],
                dateOrdered: odateOrderedArr[k],
                dateAccepted: odateAcceptedArr[k],
                dateDone: dateMarked,
                status: "completed"
            }, function(error){
                if(error)
                    window.alert(error.code);
            });

            console.log("Order Marked as Done!");

            dbref.child( arrDet[k].ID).remove();
            console.log("Order Marked as Done!!");
            location.reload();
        
        }
    }
}