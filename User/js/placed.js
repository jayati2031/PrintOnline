var user;

var repeat = document.getElementById("showRow");
var repeat2 = document.getElementById("showRow2");
var tab = document.getElementsByClassName("ordersTable")[0];
    var tab2 = document.getElementsByClassName("ordersTable2")[0];
    
    var totalProducts1, totalProducts2, totalProducts = 0, i;
    var oIdArr = [];
    var oLabelArr = [];
    var onoOfPagesArr = [];
    var otypeOfPrintArr = [];
    var ototalArr = [];
    var ourlArr = [];
    var ouserEmailArr = [];
    var odateOrderedArr = [];
    var ouserIdArr = [];
    var oStatusArr = [];
    var odateEstimatedArr = [];

    var arrDet = [];
    var changedID, changedName, changedCharge, changedLabel;
    var selectLabel = document.getElementById("plabels");
    var addOption;

    var oid, ourl, oemail, olabel, otype, opage, ototal, odate, ouid, status, odatest;
    var j, list;

function placedOrders(u) {

    user = u;

    var dbref = firebase.database().ref().child('/UserOrders/' + user.uid + '/Placed');
    var dbref2 = firebase.database().ref().child('/UserOrders/' + user.uid + '/Accepted');
    
    dbref.once("value")
        .then(function(snapshot){
            totalProducts1 = snapshot.numChildren();
            totalProducts+=totalProducts1;
            //window.alert(totalProducts);
            
            i = totalProducts1;

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
                    status = childSnapshot.child('status').val();
                    odatest = "not yet set";
                    j=i;

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
                        oStatusArr.push(status);
                        odateEstimatedArr.push(odatest);
                        
                        arrDet.push(list);
                        //console.log(variable);
                        
                        var openLink = "<div class=\"card\"><a href=\"#\" class=\"btn btn-fix text-left\" data-toggle=\"modal\" data-target=\"#orderDetails\" id=\"orderlink\" data-whatever=\"";
                        var closeLink = "\"></a></div></div>";
                        
                        document.getElementById("showRow").innerHTML = openLink + oid + closeLink;
                        document.getElementById("orderlink").innerHTML = "<div class=\"card-block \"><p class=\"card-title text-dark\" id=\"orderid\"></p><p class=\"card-text text-dark\" id=\"orderlabel\"></p><p class=\"card-text text-dark\" id=\"orderpages\"></p><p class=\"card-text text-dark\"><span>&#8377;</span><span id=\"ordertotal\"></span></p><p class=\"card-text text-dark\" id=\"orderdate\"></p>"
                        
                        // document.getElementById("spId").innerHTML = pid;

                        document.getElementById("orderid").innerHTML = oid;
                        document.getElementById("orderlabel").innerHTML = olabel;
                        document.getElementById("orderdate").innerHTML = odate;
                        document.getElementById("orderpages").innerHTML = opage + " pages";
                        document.getElementById("ordertotal").innerHTML = " " + ototal;

                        if(--i && i>0){
                            // console.log(i);
                            var clone = repeat.cloneNode(true);
                            tab.appendChild(clone);
                        }
                    }
            });
            
        });

        dbref2.once("value")
        .then(function(snapshot){
            totalProducts2 = snapshot.numChildren();
            totalProducts+=totalProducts2;
            // window.alert(totalProducts2);
            i = totalProducts2;
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
                    status = childSnapshot.child('status').val();
                    odatest = childSnapshot.child('dateEstimated').val();

                    j=totalProducts1+i;
                    // console.log(i);
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
                        oStatusArr.push(status);
                        odateEstimatedArr.push(odatest);
                        
                        arrDet.push(list);
                        //console.log(variable);
                        
                        var openLink = "<div class=\"card\"><a href=\"#\" class=\"btn btn-fix text-left\" data-toggle=\"modal\" data-target=\"#orderDetails2\" id=\"orderlink2\" data-whatever=\"";
                        var closeLink = "\"></a></div></div>";
                        
                        document.getElementById("showRow2").innerHTML = openLink + oid + closeLink;
                        document.getElementById("orderlink2").innerHTML = "<div class=\"card-block \"><p class=\"card-title text-dark\" id=\"orderid2\"></p><p class=\"card-text text-dark\" id=\"orderlabel2\"></p><p class=\"card-text text-dark\" id=\"orderpages2\"></p><p class=\"card-text text-dark\"><span>&#8377;</span><span id=\"ordertotal2\"></span></p><p class=\"card-text text-dark\" id=\"orderdate2\"></p>"
                        
                        // console.log(openLink + oid + closeLink);
                        // document.getElementById("spId").innerHTML = pid;

                        document.getElementById("orderid2").innerHTML = oid;
                        document.getElementById("orderlabel2").innerHTML = olabel;
                        document.getElementById("orderdate2").innerHTML = odate;
                        document.getElementById("orderpages2").innerHTML = opage + " pages";
                        document.getElementById("ordertotal2").innerHTML = " " + ototal;

                        if(--i && i>0){
                            var clone = repeat2.cloneNode(true);
                            tab2.appendChild(clone);
                        }
                    }
            });
            
        });

}

$('#orderDetails').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    
    var x;
        
    for(x=0; x<totalProducts; x++){
        if(arrDet[x].ID === recipient){
            document.getElementById('showID').innerHTML = oIdArr[x];
            document.getElementById('showUser').innerHTML = ouserEmailArr[x];
            document.getElementById('showPrint').innerHTML = oLabelArr[x] + " - " + otypeOfPrintArr[x];
            document.getElementById('showTotal').innerHTML = " " + ototalArr[x];
            document.getElementById('showUrl').setAttribute("href", ourlArr[x]);
            document.getElementById('showPages').innerHTML = onoOfPagesArr[x];
            document.getElementById('dateord').innerHTML = odateOrderedArr[x];
            document.getElementById('showStatus').innerHTML = oStatusArr[x];
            }
        }
     
});

$('#orderDetails2').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    
    var x;
        
    for(x=0; x<totalProducts; x++){
        if(arrDet[x].ID === recipient){
            document.getElementById('showID2').innerHTML = oIdArr[x];
            document.getElementById('showUser2').innerHTML = ouserEmailArr[x];
            document.getElementById('showPrint2').innerHTML = oLabelArr[x] + " - " + otypeOfPrintArr[x];
            document.getElementById('showTotal2').innerHTML = " " + ototalArr[x];
            document.getElementById('showUrl2').setAttribute("href", ourlArr[x]);
            document.getElementById('showPages2').innerHTML = onoOfPagesArr[x];
            document.getElementById('dateestm').innerHTML = odateEstimatedArr[x];
            document.getElementById('dateord2').innerHTML = odateOrderedArr[x];
            document.getElementById('showStatus2').innerHTML = oStatusArr[x];
            }
        }
     
});