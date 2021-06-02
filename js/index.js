var app= angular.module("myapp",["ngRoute"]);
app.config(function($routeProvider){
  $routeProvider
  .when("/index", {templateUrl:"Category.html",controller:"home"})
  .when("/1", {redirectTo: $routeProvider})
  .when("/change", {redirectTo: $routeProvider})
  .when("/Signup", {templateUrl:"Signup.html",controller:"signup"})
  .when("/info", {templateUrl:"Info.html",controller:"info"})
  .when("/profile", {redirectTo: $routeProvider,controller:"forgot"})
  .when("/home", {redirectTo: $routeProvider,controller:"signup"})
  .when("/about", {templateUrl:"GioiThieu.html"})
  .when("/faq", {templateUrl:"FAQ.html"})
  .when("/contact", {templateUrl:"contact.html"})
  .when("/comment", {templateUrl:"comment.html"})
  .when("/tracnghiem/:idMH/:tenMH", {templateUrl:"tracnghiem.html", controller:"tnctrl"})
 
  .otherwise({templateUrl:"Category.html",controller:"home"})
});
    app.controller("home",homefunc);
   
    function homefunc($scope,$http,$rootScope){
     
      $rootScope.students = listst;
      
        $scope.start =0;
        $scope.monhoc = [];
        $scope.next = function(){
    
         $scope.start+=6;
      

    
        }
        $scope.truoc = function(){
            if($scope.start>=6)
            $scope.start-=6;
            else{$scope.start =0}
        }
        $scope.logout = function(){
          sessionStorage.clear();
        } 
        $http.get("js/Subjects.js").then(function(response){
        $scope.monhoc = response.data;
        });
        $scope.islogin = function(){
          if(sessionStorage.getItem("hoten")!=null) return true;
          else return false;
        }
        $scope.index = parseInt(sessionStorage.getItem("chiso"));
       
           if(sessionStorage.getItem("hoten")!=null)
           {
            
            $rootScope.hoten = sessionStorage.getItem("hoten");
            // alert($rootScope.hoten);
           }

           $scope.thongbao = function(){
            Swal.fire({
              title: 'Vui lòng đăng nhập để thực hiện bài thi',
              text: "",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Đăng nhập',
              cancelButtonText:'Huỷ'
            }).then((result) => {
              if (result.isConfirmed) {
                $("#loginModal").modal('show');
              }
             
            
           
            })
           }
          
            
           
             
}

app.controller("frmdn", function($scope,$rootScope){
   
    $scope.student = {};
   
   
    
  
    $scope.login = function(){
     
      var u = $scope.u;
          var p = $scope.p;
          var tc = false;
          var motsv;
          var i;
          for( i = 0;i< $rootScope.students.length;i++)
          {
            motsv = $rootScope.students[i];
            if(u==motsv.username && p== motsv.password)
            {
              tc = true;
            
             
            
              break;
            }
          }
          
          if(tc)
          {
           
          sessionStorage.setItem("chiso",i.toString())
          sessionStorage.setItem("userName",motsv.username);

           sessionStorage.setItem("hoten",motsv.fullname);
           
           document.location="index.html";
           Swal.fire({
           
            icon: 'success',
            title: 'Đăng nhập thành công',
            showConfirmButton: false,
            timer: 1500
          })
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Đăng nhập thất bại',
              text: 'Vui lòng kiểm tra lại!',
              footer: '<a href>Quên mật khẩu?</a>'
            })
          }
     
    }
  });



  app.controller("frmchangepass", function($scope,$rootScope){
   
    $scope.index = parseInt(sessionStorage.getItem("chiso"));
    
    $scope.curst = angular.copy($rootScope.students[$scope.index])
    $scope.u = $scope.curst.username;
    $scope.isCorrect = true;
    $scope.isSame = true;
    $scope.changepass = function(){
      if($scope.old!=""&& $scope.newpass !="" && $scope.renewpass!="")
      {
        if($scope.old != $scope.curst.password) $scope.isCorrect =false
        else
        {
          $scope.isCorrect= true;
          if($scope.newpass!=$scope.renewpass) $scope.isSame =false;
          else
          {
            Swal.fire(
              
              '',
              'Đổi mật khẩu thành công',
              'success'
            )
            $scope.isSame = true
            $scope.curst.password =$scope.newpass;
            $rootScope.students[$scope.index] = angular.copy($scope.curst);
            sessionStorage.clear();
            $('#changepassModal').modal('hide')
          }
        }
      }
     
     
    }
    
    
  
   
  });
  app.controller("signup", function($scope,$rootScope){
    $rootScope.students = listst;
    console.log($rootScope.students[0].username);
    $scope.newstudent ={};
   
    $scope.isSame = true;
    $scope.isexist =false;
    $scope.checkexist=function(){
      for(var i = 0;i<$rootScope.students.length;i++)
      {
      
        if($rootScope.students[i].username==$scope.newstudent.username) return true
      }
      return false
      
    }
    for(var i = 0;i<$rootScope.students.length;i++)
    {
      console.log($rootScope.students[i].username);
    }
     $scope.Dangky = function(){
      
     if($scope.checkexist())
     {
       $scope.isexist = true;
     }
      else
      {
        $scope.isexist = false;
        if($scope.newstudent.password !=$scope.repass) $scope.isSame = false
        else 
        {
          Swal.fire(
                
            '',
            'Đăng ký thành công',
            'success'
          )
          $scope.isSame = true
        $scope.newstudent.marks = "0";
        $rootScope.students.push(angular.copy($scope.newstudent));
        }
        
      }
     
     }
    
    
    
    
  
   
  });

  app.controller("info", function($scope,$rootScope){
   
    $scope.index = parseInt(sessionStorage.getItem("chiso"));
    $scope.curst={};
    
    $scope.curst = angular.copy($rootScope.students[$scope.index]);
  
  
   
     
     $scope.update = function(){
      Swal.fire(
              
        'Thay đổi thông tin thành công',
        '',
        'success'
      )
      $rootScope.students[$scope.index] = angular.copy($scope.curst);
      $rootScope.hoten = $rootScope.students[$scope.index].fullname;
      
      
     }
    
    
    
  
   
  });

  app.controller("forgot", function($scope,$rootScope){
   var isfound = false;
   
     
     $scope.forgot = function(){
      for(var i = 0;i<$rootScope.students.length;i++)
      {
        if($scope.forgotusername == $rootScope.students[i].username && $scope.forgotemail == $rootScope.students[i].email)
        {
          $scope.pass = $rootScope.students[i].password;
          isfound = true;
          break;
        }
        
  
      }
      Swal.fire(
              
        'Khôi phục mật khẩu thành công',
        'Mật khẩu: '+$scope.pass,
        'success'
      )
     
     }
    
    
    
  
   
  });
  

app.controller("tnctrl", function($scope, $http, $routeParams, $interval){
  $scope.begin =0;
    $scope.caccauhoi = [];
    $scope.idMH = $routeParams.idMH;
    $scope.tenMH = $routeParams.tenMH;
    $http.get("js/Quizs/" + $scope.idMH + ".js").then(
        function(d) {var cauhoi = d.data;
          var list = [];
          for (var i=0; i<20; i++) {
           list.push(cauhoi.splice(Math.random()*(cauhoi.length-1),1).pop());
           list[i].traloi="";
          }

        $scope.listques = list;   
        $scope.curques = angular.copy($scope.listques[0]);
       
        
        
        },
        function(d) {alert("Loi");}
    );

$scope.loadques = function(chiso){
$scope.listques[$scope.begin].traloi= $scope.curques.traloi;
$scope.begin = chiso;
$scope.curques = angular.copy($scope.listques[chiso]);

}


$scope.sau = function(){
$scope.listques[$scope.begin].traloi= $scope.curques.traloi;
$scope.begin+=1;
$scope.loadques($scope.begin);




}
$scope.truo = function(){
  $scope.listques[$scope.begin].traloi= $scope.curques.traloi;
if($scope.begin>=1)
$scope.begin-=1;
else{$scope.begin =0}
$scope.loadques($scope.begin);
}

$scope.countDown = 0;

$interval(function() {

var minutes = parseInt($scope.countDown / 60, 10)
var seconds = parseInt($scope.countDown % 60, 10);
$scope.minutes = minutes < 10 ? "0" + minutes : minutes;
$scope.seconds = seconds < 10 ? "0" + seconds : seconds;
console.log($scope.countDown++);


}, 1000, $scope.countDown);



$scope.checkAll = function(){
  for(var i=0; i<20; i++)
  {
    if($scope.listques[i].traloi=="") return false;
  }
  return true;

}

$scope.tinhdiem = function()
{
  $scope.listques[$scope.begin].traloi= $scope.curques.traloi;
  if(!$scope.checkAll())
  {
    Swal.fire({
      title: 'Kết thúc bài thi?',
      text: "Bạn chưa trả lời tất cả các câu hỏi!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tiếp tục!',
      cancelButtonText:'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        var tongdiem =0;
        var dung =0;
        var sai;
         for(var i=0; i<20; i++)
         {
           if($scope.listques[i].traloi==$scope.listques[i].AnswerId) 
           dung =dung +1;
           
           
           
           
       
         }
         $scope.right = dung;
         
         $scope.ketqua = dung*0.5;
         Swal.fire({
          title: 'Bạn đạt điểm '+$scope.ketqua+"/10",
          text: 'Thời gian làm bài: '+ $scope.minutes+' phút '+ $scope.seconds + 'giây',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    })
  }
  else
  {

    Swal.fire({
      title: 'Bạn muốn kết thúc bài thi?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tiếp tục',
      cancelButtonText:'Huỷ'
    }).then((result) => {
     
      var tongdiem =0;
    var dung =0;
    var sai;
     for(var i=0; i<20; i++)
     {
       if($scope.listques[i].traloi==$scope.listques[i].AnswerId) 
       dung =dung +1;
       
       
       
       
   
     }
     $scope.right = dung;
     
     $scope.ketqua = dung*0.5;
     Swal.fire({
      title: 'Bạn đạt điểm '+$scope.ketqua+"/10",
      Text: 'Thời gian làm bài:'+ $scope.minutes+' phút '+ $scope.seconds + 'giây',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    })
    
  }
 



 
}






    
})



  
