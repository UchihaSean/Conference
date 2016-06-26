angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Important_People,Normal_People,Time,$http) {
    //$scope.rooms=Rooms.all();
    $scope.start={};
    $scope.end={};
    $scope.long={};
    $scope.meeting={};
    $scope.meeting_info="暂无";
    //必须与会人员名单
    $scope.important_people=Important_People.all();
    //非必须与会人员名单
    $scope.normal_people=Normal_People.all();
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
    $scope.requestMeeting=function(){
      //$scope.meeting_info="暂无";

      $http.post(url, data, config)
        .success(function (data, status, headers, config) {
          //会议信息修改
          $scope.meeting_info=""
          console.log($scope.meeting_info);
        })
        .error(function (data, status, header, config) {
          console.log("error requestMeeting")
        });
    };
    //获取人员名单
    $scope.getImportantPeople=function(){
      $http.post(url, data, config)
        .success(function (data, status, headers, config) {
          //设置必须与会人员名单
          $scope.important_people=data;
          //设置非必须与会人员名单
          $scope.normal_people=data;
        })
        .error(function (data, status, header, config) {
          console.log("error getImportantPeople")
        });
    };
    //复选框选中操作 或许有更好方式
    $scope.getChoose=function(choose_person){
      if (choose_person.choose=='false'){
        choose_person.choose=='true'
      } else{
        choose_person.choose=='false';
      }
    }

  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
