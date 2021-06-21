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
    var odateDoneArr = [];
    var odateOrderedArr = [];
    var odateAcceptedArr = [];
    
    var user;
    
    var arrDet = [];

    var oid, ourl, oemail, olabel, otype, opage, ototal, odate, odatea, odateo, ouid, status;
    var j, list;
    
    function completedOrders(u) {
        user = u;

        var dbref = firebase.database().ref().child('/UserOrders/' + user.uid + '/Completed');
        dbref.once("value")
        .then(function(snapshot){
            totalProducts = snapshot.numChildren();
            i = totalProducts;
            snapshot.forEach(function(childSnapshot){

                    oid = childSnapshot.child('orderID').val();
                    ourl = childSnapshot.child('url').val();
                    oemail = childSnapshot.child('userEmail').val();
                    olabel = childSnapshot.child('label').val();
                    otype = childSnapshot.child('typeOfPrint').val();
                    opage = childSnapshot.child('noOfPages').val();
                    ototal = childSnapshot.child('total').val();
                    odate = childSnapshot.child('dateDone').val();
                    odatea = childSnapshot.child('dateAccepted').val();
                    odateo = childSnapshot.child('dateOrdered').val();
                    status = childSnapshot.child('status').val();

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
                        odateDoneArr.push(odate);
                        odateAcceptedArr.push(odatea);
                        odateOrderedArr.push(odateo);

                        arrDet.push(list);
                        
                        var openLink = "<div class=\"card\"><a href=\"#\" class=\"btn btn-fix text-left\" data-toggle=\"modal\" data-target=\"#orderDetails\" id=\"orderlink\" data-whatever=\"";
                        var closeLink = "\"></a></div></div>";
                        document.getElementById("showRow").innerHTML = openLink + oid + closeLink;
                        document.getElementById("orderlink").innerHTML = "<div class=\"card-block \"><p class=\"card-title text-dark\" id=\"orderid\"></p><p class=\"card-text text-dark\" id=\"orderlabel\"></p><p class=\"card-text text-dark\"><i class=\"fa fa-inr\"></i><span id=\"ordertotal\"></span></p><p class=\"card-text text-dark\" id=\"donedate\"></p>"
                        
                        // document.getElementById("spId").innerHTML = pid;

                        document.getElementById("orderid").innerHTML = oid;
                        document.getElementById("orderlabel").innerHTML = olabel;
                        document.getElementById("donedate").innerHTML = "Completed on " + odate;
                        document.getElementById("ordertotal").innerHTML = " " + ototal;

                        if(--i){
                            //console.log(i);
                            var clone = repeat.cloneNode(true);
                            tab.appendChild(clone);
                        }
                    }
            });
            
        });
    }


$('#orderDetails').on('show.bs.modal', function(event){
    var button = $(event.relatedTarget)
    var recipient = button.data('whatever')
    var modal = $(this);
    var x;
        
    for(x=0; x<totalProducts; x++){
        if(arrDet[x].ID === recipient){
            document.getElementById('showID').innerHTML = oIdArr[x];
            document.getElementById('showUser').innerHTML = ouserEmailArr[x];
            document.getElementById('showPrint').innerHTML = oLabelArr[x] + " - " + otypeOfPrintArr[x];
            document.getElementById('showTotal').innerHTML = " " + ototalArr[x];
            document.getElementById('showPages').innerHTML = onoOfPagesArr[x];
            document.getElementById('datecom').innerHTML = odateDoneArr[x];
            document.getElementById('dateacc').innerHTML = odateAcceptedArr[x];
            document.getElementById('dateord').innerHTML = odateOrderedArr[x];
            modal.find('.modal-body #fileUrl').attr('href', ourlArr[x]);
            }
        }
     
});