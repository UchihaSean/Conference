angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})




.factory('Important_People',function(){
    //测试用，连接后端后进行清空
    var people=[
      {id:1, name:"zhouyi",choose:"false"},
      {id:2, name:"jilingyang",choose:"false"},
      {id:3, name:"xujiacheng",choose:"false"},
      {id:4, name:"xujiacheng",choose:"false"}
    ];
    return{
      all:function(){
        return people;
      },
      set:function(data){
        people=data;
      }
    }
  })
  .factory('Normal_People',function(){
    //测试用，连接后端后进行清空
    var people=[
      {id:1, name:"zhouyi",choose:"false"},
      {id:2, name:"jilingyang",choose:"false"},

    ];
    return{
      all:function(){
        return people;
      },
      set:function(data){
        people=data;
      }
    }
  })


  //设置时间选择，时长选择
.factory('Time',function(){
    var month=[];
    var day=[];
    var hour=[];
    var minute=[];
    var long=[];
    for (var i=1;i<13;i++){
      month.push(i);
    }
    for (var i=1;i<32;i++){
      day.push(i);
    }
    for (var i=0;i<24;i++){
      hour.push(i);
    }
    for (var i=0;i<60;i++){
      minute.push(i);
    }
    for (var i=1;i<21;i++){
      long.push(i*10);
    }
    return{
      getMonth:function(){
        return month;
      },
      getDay:function(){
        return day;
      },
      getHour:function(){
        return hour;
      },
      getMinute:function(){
        return minute;
      },
      getLong:function(){
        return long;
      }
    }
  })


