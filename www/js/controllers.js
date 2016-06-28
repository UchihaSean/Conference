angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Important_People,Normal_People,Time,$http) {
    //$scope.rooms=Rooms.all();
    $scope.start={};
    $scope.end={};
    $scope.long={};
    $scope.meeting={};
    $scope.meeting_info;
    //必须与会人员名单
   $scope.important_people=[];
    //非必须与会人员名单
  $scope.normal_people=[];
    //时间
    $scope.time_month=Time.getMonth();
    $scope.time_day=Time.getDay();
    $scope.time_hour=Time.getHour();
    $scope.time_minute=Time.getMinute();
    $scope.time_long=Time.getLong();
    //获取会议
    //start 中绑定开始时间 start.month .day .hour .minute
    //end 中格式和start 中相同
    //long.minute 绑定持续时间
    //meeting.theme 会议主题
    //会议人员需要通过复选框验证
    //add
    $scope.requestMeeting=function(){
      //判断必要信息是否为空
      if(
        $scope.start.month ==undefined || $scope.start.day ==undefined ||$scope.start.hour ==undefined ||
        $scope.start.minute ==undefined ||$scope.end.month ==undefined ||$scope.end.day ==undefined ||
        $scope.end.hour ==undefined ||$scope.end.minute ==undefined ||$scope.long.minute ==undefined
      )
      {
        alert('请选择会议起始时间范围或者会议时长');
        return;
      }
     // var max_day = 5;
      if($scope.start.month == $scope.end.month){
        /*
        if( ($scope.end.day - $scope.start.day + 1) > max_day ){
          alert('时间范围请选择5天以内');
          return;
        }
        */
        if( $scope.start.day > $scope.end.day){
          alert('请正确选择时间范围');
          return;
        }
      }
      if($scope.start.month > $scope.end.month){
        alert('请正确选择时间范围');
        return;
      }
      if($scope.meeting.theme ==''||$scope.meeting.theme == undefined){
        alert('请输入会议主题');
        return;
      }
      var important = [];
      var importantList;
      var normal = [];
      var normalList;
      for(var i =0;i < $scope.important_people.length ;i++){
        if($scope.important_people[i].choose == true ){
          important.push($scope.important_people[i].id);
        }
      }
      for(var i =0;i < $scope.normal_people.length ;i++){
        if($scope.normal_people[i].choose == true ){
          normal.push($scope.normal_people[i].id);
        }
      }
      if( important.length == 0){
        alert('请选择必须与会人员');
        return;
      }else{
        for(var i =0;i<important.length;i++){
          if( i == 0){
            if(important.length == 1){
              importantList = important[i];
            }else{
              importantList = important[i]+',';
            }
            continue;
          }
          if(i == (important.length -1)){
            importantList += important[i]+'';
            continue;
          }else{
            importantList += important[i];
            importantList += ',';
            continue;
          }
        }
      }

      if( normal.length == 0){
        normalList = '-1';
      }else{
        for(var i =0;i<normal.length;i++){
          if( i== 0){
            if(normal.length == 1){
              normalList = normal[i];
            }else{
              normalList = normal[i]+',';
            }
            continue;
          }
          else if(i == (normal.length -1) ){
            normalList += normal[i]+'';
            continue;
          }else{
            normalList += normal[i]+',';
            continue;
          }
        }
      }

      //判断是否重复选择人员
      for(var i =0; i<important.length;i++){
        if(normal.indexOf(important[i]) > -1){
          alert('请不要重复选择人员');
          return;
        }
      }

      var url = "http://10.131.229.171:8080/meeting/arrangement/"
        +$scope.start.month+","+$scope.start.day+","+$scope.start.hour+","+$scope.start.minute+"/"
        +$scope.end.month+","+$scope.end.day+","+$scope.end.hour+","+$scope.end.minute+"/"
        +$scope.long.minute+"/"+importantList+"/"+normalList+"/"+$scope.meeting.theme;
      console.log(url);
       $http.post(url)
       .success(function (data) {
       //会议信息修改
         if( data.value.length >0){
           $scope.meeting_info = data.value;
         }else{
           alert('无合适推荐');
         }
       //   $scope.meeting_info=""
       })
       .error(function (data, status, header, config) {
       console.log("error requestMeeting")
       });


    };
    //获取人员名单
    //add
    $scope.getImportantPeople=function(i){

      console.log('START GET PERSONS');
      var url = "http://10.131.229.171:8080/meeting/persons";
      $http.post(url)
        .success(function (data) {
          $scope.all_people = data.value;
          if( i==0 ){
            //设置必须与会人员名单

            $scope.important_people=data.value;
          }else{
            //设置非必须与会人员名单
            $scope.normal_people=data.value;
          }

        })
        .error(function (data, status, header, config) {
          console.log("error getImportantPeople")
        });
    };
    //复选框选中操作 或许有更好方式
    //add
    $scope.getChoose=function(choose_person,i){
       if (choose_person.choose==false ||choose_person.choose == undefined){
         /*
          if( i==0){
          //删除normal_person中对应项
          var index = $scope.important_people.indexOf(choose_person);
          $scope.normal_people.remove(choose_person,index);
          }else{
          //删除important_person中对应项
          index = $scope.normal_people.indexOf(choose_person);
          $scope.important_people.remove(choose_person,index);
          }
          */
         choose_person.choose=true;
       }else{
       choose_person.choose=false;
         /*
          if( i==0){
          //添加normal_person中对应项
          var index = $scope.important_people.indexOf(choose_person);
          $scope.normal_people.add(choose_person,index);
          }else{
          //添加important_person中对应项
          var index = $scope.normal_people.indexOf(choose_person);
          $scope.important_people.add(choose_person,index);
          }
          */
       }

    };
  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val)
      {
        return i;
      }
    }
    return -1;
  };
  Array.prototype.remove = function(val,index) {
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  Array.prototype.add = function(val,index) {
    if (index > -1) {
      this.splice(index, 0,val);
    }
  };
  //confirm meeting
  $scope.confirm = function(meeting){
    var index;
    if($scope.meeting_info.indexOf(meeting)>-1){
      index = $scope.meeting_info.indexOf(meeting);
    }else{
      alert('error');
      return;
    }
    var person_num = meeting.persons.length;
    var personList ;
    for(var i =0;i<person_num;i++){
      if( i == 0){
        if(person_num == 1){
          personList = meeting.persons[i].id;
        }else{
          personList = meeting.persons[i].id+',';
        }
        continue;
      }
      if(i == (person_num -1)){
        personList += meeting.persons[i].id+'';
        continue;
      }else{
        personList += meeting.persons[i].id;
        personList += ',';
        continue;
      }
    }
    var url = "http://10.131.229.171:8080/meeting/confirm/"
      + meeting.start.month+','+meeting.start.day+','+meeting.start.hour+','+meeting.start.minute+'/'
      + meeting.end.month+','+meeting.end.day+','+ meeting.end.hour+','+ meeting.end.minute+'/'
      + meeting.name +'/'+meeting.room.id+'/'+personList;
      ;
    $http.post(url)
      .success(function (data) {
       if(data.value == 'true'){
         alert('申请成功');
         location.reload();
       }else{
         alert('申请失败，出现错误');
       }

      })
      .error(function (data, status, header, config) {
        console.log("error getImportantPeople")
      });
  };
  })

.controller('ChatsCtrl', function($scope, Chats,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  function getPeople(){
    /*
    单机测试

    $scope.chats = [
      {id:11, name:"zhouyi",choose:false},
      {id:22, name:"jilingyang",choose:false},
      {id:33, name:"xujiacheng",choose:false},
      {id:44, name:"Yao",choose:false}
    ];
*/
    console.log('START GET PERSONS');
    var url = "http://10.131.229.171:8080/meeting/persons";
    $http.post(url)
      .success(function (data) {
        $scope.chats = data.value;
      })
      .error(function (data, status, header, config) {
        console.log("error getImportantPeople")
      });
  }
  //获取所有人员信息
  getPeople();
  /*
   $scope.chats = Chats.all();
   $scope.remove = function(chat) {
   Chats.remove(chat);
   };
   */

})

.controller('ChatDetailCtrl', function($scope,$http) {
  function getPersonId(){
    var tmp = window.location.href.split('/');
    var len = tmp.length;
    var id = tmp[len-1];
    return id;
  }
  var view_person_id = getPersonId();
  function getMeetings(){
    /*
    test

    $scope.meetings =[
      {
        "id":12,
        "name":"SoftwareEngineering",
        "persons":[{"id":1,"name":"zhouyi"}],
        "room":{"id":34,"name":"GuanghuaTower"},
        "start":{"month":3,"day":2,"hour":9,"minute":30},
        "end":{"month":3,"day":2,"hour":12,"minute":0}
      },
      {
        "id":13,
        "name":"ASFg",
        "persons":[{"id":1,"name":"Yao"}],
        "room":{"id":34,"name":"ATower"},
        "start":{"month":4,"day":2,"hour":9,"minute":30},
        "end":{"month":4,"day":2,"hour":12,"minute":0}
      }
    ];
     */
    var url = "http://10.131.229.171:8080/meeting/show/"+view_person_id;
    $http.post(url)
      .success(function (data) {
        $scope.meetings = data.value;
      })
      .error(function (data, status, header, config) {
        console.log("error getImportantPeople")
      });
  }
  getMeetings();
  //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
