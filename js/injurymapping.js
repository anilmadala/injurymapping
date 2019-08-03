angular.module('ratefast',['ng-clipboard'])
.controller('InjuryMapping', function ($scope) {

    var setdoi="";
  function formatDate(date) { 
     var day = date.getDate();
     var monthIndex = date.getMonth()+1;
     var year = date.getFullYear();
    return monthIndex + '/' + day + '/' + year +'.';
  
 }
 
	function setdatewithcomma(date){
		var day = date.getDate();
		var monthIndex = date.getMonth()+1;
		var year = date.getFullYear();
		return monthIndex + '/' + day + '/' + year +',';
	}

    $scope.showMessage = false;
    var i = 1;
    $scope.Ans =[];
    for (i;i<=10;i++ ){
      $scope.Ans.push(-1);
    }
	
	
	$scope.goback=function(){
		$scope.showMessage = false;
		$scope.showheader=false;
		document.getElementById('datepicker').value=setdoi;
	};
	
	$scope.pagereset=function(){
		 location.reload();
	};
	
    $scope.reset = function (qn) {
      $scope.showMessage = false;
      var j = $scope.Ans.length;		
      for(qn ;qn <=j ; qn++) {
        $scope.Ans.splice(qn, 1, -1);
      }
      $scope.showheader=false;

    };
 
    $scope.injurycalculate = function () {
		$scope.showMessage = true;
		$scope.showheader=true;
		$scope.injuryresult="";
		var next_treatment="";
		var addDays;
		var projected_mmi="";
		var mmi=false;
        var doi=document.getElementById('datepicker').value;
	 
	if(doi!=""){
		setdoi=doi;
	  doi=new Date(doi);
	}
	else{
		alert('Please select date of injury.');
		 $scope.showheader=false;
		$scope.showMessage=false;
		return false;
	}
	  
	  var current_date=new Date();
	  var dd=current_date.getDate(),mm=current_date.getMonth()+1,yy=current_date.getFullYear();
	  var today=new Date(mm+"/"+dd+"/"+yy);
	  try{
	  var timeDiff = Math.abs(today.getTime() - doi.getTime());
	  }
	  catch(e){
		alert('Please select date of injury.');
		 $scope.showheader=false;
		$scope.showMessage=false;
		return false;
	  }
	 
     var  days_elapsed = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
     var meds_expected=0;
	 var therapy_expected = 28;
	 var dx_expected=70;
	 var specialty_expected=84;
	 var surgery_expected=168;

	 var meds_due=days_elapsed-meds_expected;
	 var therapy_due=days_elapsed-therapy_expected;
	 var dx_due=days_elapsed-dx_expected;
     var specialty_due=days_elapsed-specialty_expected;
	 var surgery_due=days_elapsed-surgery_expected;
	
   var meds_duedate=new Date().setDate((new Date().getDate() + Math.abs(meds_due)));
   var therapy_duedate=new Date().setDate((new Date().getDate() + Math.abs(therapy_due)));
   var dx_duedate=new Date().setDate((new Date().getDate() + Math.abs(dx_due)));
   var speclalty_duedate=new Date().setDate((new Date().getDate() + Math.abs(specialty_due)));
   var surgery_duedate=new Date().setDate((new Date().getDate() + Math.abs(surgery_due)));
	  
		
		 if( ($scope.Ans[1]===0 && $scope.Ans[2]===1) || $scope.Ans[7]===0 ||$scope.Ans[8]==128 || $scope.Ans[6]==11 ||$scope.Ans[6]==12){
			 mmi=true;
			 $scope.injuryresult=" The injury is MMI today,  "+ formatDate(new Date(current_date));
		 }
		 /*
		else if($scope.Ans[3]===0 || $scope.Ans[4]===0 ||$scope.Ans[5]===0 ||$scope.Ans[6]===0 ||$scope.Ans[8]===64 || $scope.Ans[8]===256){
				$scope.injuryresult +=" The injury is not yet MMI.";
		}
		*/
		else
		{
			$scope.injuryresult +=" The injury is not yet MMI.";
		}
	   
	   if($scope.Ans[1]===0)
		   $scope.injuryresult += " There are no pain/symptoms.";
	   if($scope.Ans[1]===1)
		   $scope.injuryresult +=" Pain/symptoms are present.";
		
	 
      if($scope.Ans[2]===0)
		   $scope.injuryresult +=" Employee is not back to work at full duty.";
	  if($scope.Ans[2]===1)
		   $scope.injuryresult +=" Employee is back to work at full duty.";
	 
	 
	  if($scope.Ans[3]===4)
		   $scope.injuryresult +=" Medication has been provided for at least 2 weeks.";
	  if($scope.Ans[3]===5)
		   $scope.injuryresult +=" Medication has been declined by patient.";
	  if($scope.Ans[3]===3)
		   $scope.injuryresult +=" Medication has been denied by UR.";
	  if($scope.Ans[3]===0)
	  {
			 next_treatment="medication";
			 addDays=749;
		     $scope.injuryresult +=" Medication trial recommended.";
				if(!isNaN(meds_due)){
				   if(meds_due >0){
					   $scope.injuryresult +=" Medication is " + meds_due  + " day(s) overdue.";
				   }
				   else if(meds_due <0){
					$scope.injuryresult +=" Medication is due in " + Math.abs(meds_due) + " days on " + setdatewithcomma(new Date(meds_duedate))+ " or earlier if no current active recovery.";
				   }
				   else if(meds_due ==0){
					   $scope.injuryresult +=" Medication is due today, on "+ formatDate(new Date(current_date));
				   }
			}
	  }
	  
	  if($scope.Ans[4]===-1)
		  $scope.injuryresult +=" If patient fails to respond to respond to current treatment, then therapy is due on "+ formatDate(new Date(therapy_duedate));
	  if($scope.Ans[4]===8)
		   $scope.injuryresult +=" Therapy has been provided for at least 6 visits.";
	 if($scope.Ans[4]===6)
		   $scope.injuryresult +=" Therapy has been declined by patient.";
	 if($scope.Ans[4]===7)
		   $scope.injuryresult +=" Therapy has been denied by UR.";
	  if($scope.Ans[4]===0)
	  {
		   next_treatment="therapy";
		   addDays=504;
		   $scope.injuryresult +=" Therapy has not yet been provided."; 

		   if(!isNaN(therapy_due)){
			   if(therapy_due==0)
				    $scope.injuryresult +=" Therapy is due today, "+ formatDate(new Date(current_date));
			  else if(therapy_due >0){
				   $scope.injuryresult +=" Therapy is " + therapy_due  + " day(s) overdue.";
			   }
			   else if(therapy_due <0){
				 $scope.injuryresult +=" Therapy is due in " + Math.abs(therapy_due)+ " days on " + setdatewithcomma(new Date(therapy_duedate))+ " or earlier if no current active recovery.";
			   }
		}
		   
	  }
	  
	  if($scope.Ans[5]===-1)
		   $scope.injuryresult +=" If patient fails to respond to respond to current treatment, then diagnostic testing is due on "+ formatDate(new Date(dx_duedate));
	  if($scope.Ans[5]===16)
		   $scope.injuryresult +=" Diagnostic testing has been performed.";
	  if($scope.Ans[5]===9)
		   $scope.injuryresult +=" Diagnostic testing has been declined by patient.";
	  if($scope.Ans[5]===10)
		   $scope.injuryresult +=" Diagnostic testing has been denied by UR.";
	  if($scope.Ans[5]===0){
		   next_treatment="dxtr";
		   addDays=126; 
		  $scope.injuryresult +=" Diagnostic testing has not been performed."; 
		  
		   if(!isNaN(dx_due)){
			   if(dx_due==0)
				    $scope.injuryresult +=" Diagnostic testing is due today, "+ formatDate(new Date(current_date));
			  else if(dx_due >0){
				   $scope.injuryresult +=" Diagnostic testing is " + dx_due  + " day(s) overdue.";
			   }
			   else if(dx_due <0){
				 $scope.injuryresult +=" Diagnostic testing is due in " + Math.abs(dx_due)+ " days on "+ setdatewithcomma(new Date(dx_duedate))+ " or earlier if no current active recovery.";
			   }
		}
		  
	  }
	 
	 if($scope.Ans[6]===-1)
		    $scope.injuryresult +=" If patient fails to respond to respond to current treatment, then specialty consultation is due on "+ formatDate(new Date(speclalty_duedate));
	   if($scope.Ans[6]===32)
		   $scope.injuryresult +=" Specialty consultation has occurred.";
	   if($scope.Ans[6]===11)
		   $scope.injuryresult +=" Specialty consultation has been declined by patient. All available treatment options have been used or denied.";
	   if($scope.Ans[6]===12)
		   $scope.injuryresult +=" Specialty consultation has been denied by UR. All available treatment options have been used or denied.";
	  if($scope.Ans[6]===0)
	  {
		   next_treatment="specialty";
		   addDays=126; 
		   $scope.injuryresult +=" Specialty consultation has not yet occurred.";
		   
		    if($scope.Ans[5]===9 || $scope.Ans[5]===10)
		   {
			  $scope.injuryresult +=" Specialty consultation is due today,  "+ formatDate(new Date(current_date));  
		   }
		   
		    if(!isNaN(specialty_due)){
			   if(specialty_due>0){
				   $scope.injuryresult +=" Specialty consultation testing is " + specialty_due  + " day(s) overdue.";
			   }
			   else if(specialty_due <0){
				 $scope.injuryresult +=" Specialty consultation is due in  " + Math.abs(specialty_due)+ " days on "+ setdatewithcomma(new Date(speclalty_duedate))+ " or earlier if no current active recovery.";
			   }
		}
		   
	  }

    if($scope.Ans[7]===64)
		  $scope.injuryresult +=" Specialty consult recommends surgery/intervention.";
	 if($scope.Ans[7]===0)
	 {
		  next_treatment="surgeryneeded";
		  $scope.injuryresult +=" Specialty consult does not recommend surgery/intervention.";
	 }
	 
	 
   if($scope.Ans[8]===64){
	    next_treatment="surgeryapproved";
		$scope.injuryresult +=" The surgery/intervention has been approved.";
   }
   if($scope.Ans[8]===125){
	    next_treatment="surgeryapproved";
		$scope.injuryresult +=" The surgery/intervention has been declined by patient. All available treatment options have been used or denied.";
   }
   if($scope.Ans[8]===128){
		  next_treatment="surgeryapproved";
		  $scope.injuryresult +=" The surgery/intervention has been denied by utilization review. All available treatment options have been used or denied.";
	}
    if($scope.Ans[8]===256)
	{
		 next_treatment="surgeryapproved";
		 $scope.injuryresult +=" The surgery/intervention approval is pending.";
	}
   
	 if( next_treatment=="medication" ||next_treatment=="therapy" ||next_treatment=="dxtr" ||next_treatment=="specialty"){
		   
		   projected_mmi =  current_date.setDate(current_date.getDate() + addDays);
		  $scope.injuryresult +=" MMI anticipated on " + formatDate(new Date(projected_mmi));  
	   }
	  else if(next_treatment=="surgeryapproved"){
		   if($scope.Ans[8]===256)
			    $scope.injuryresult +=" If surgery/intervention is authorized, then MMI date is expected 35 weeks after date of procedure.";
			if($scope.Ans[8]===64)
			  $scope.injuryresult +=" MMI anticipated 35 weeks after date of procedure.";
	   }
	   if(mmi){
		    $scope.injuryresult +=" Consider patient referral to QME for additional clinical documentation and opinion and medical necessity.";
	   }
	  
	 document.getElementById('datepicker').value="";
	 
 
	    
    };
	
	

	 $('#copttxtbtn').popover().click(function () {
      setTimeout(function () {
          $('#copttxtbtn').popover('hide');
      }, 2000);
  });

});

    