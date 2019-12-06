//console.log('Hi, this is GoodsBot');

var TwitterPackage = require('twitter');
//접속 토큰 정보와 고객정보를 secret 객체를 포함하는 객체 변수를 정의해 추가
var secret = require("./secret");
// var mentionString = '@' + tweet.user.screen_name;

var Twitter = new TwitterPackage(secret);

//Twitter 객체의 post 함수를 호출
//stautses/update 는 트윗의 상태를 갱신
// status{} 는 자바스크립트 객체로, 전송된 트윗의 상태를 함수에 전달한다.
// Twitter.post('statuses/update', {status:'This is a sample automated Tweet'}, function(error, tweet, response){
//     if(error){
//         console.log(error);
//     }
//     console.log(tweet); //트윗 내용
//     console.log(response); //원본 response 객체
// });

//필터와 함께 수신하려는 상태가 무엇인지 알려준다. 
//객체와 함께 해당 필터를 정의한다. (수신하고자 하는 단어나 해시태그, 구문으로 정의할 수 있다.)
//스트리밍 준비가 끝나면 함수 호출. 스트림 객체를 함수로 전달. 오류처리 등의 작업가능한 함수.
Twitter.stream('statuses/filter', {track: '#GoodsBot'}, function(stream){
    stream.on('data', function(tweet){
        console.log(tweet.text);
        var statusObj = {status: "Hi @" + tweet.user.screen_name +", Nice to meet you! How are you?"}

        Twitter.post('statuses/update', statusObj, function(error, tweetReply, response){
            if(error){
                console.log(error);
            }

            console.log(tweetReply.text);
        });
    });

    stream.on('error', function(error){
        console.log(error);
    });
});

    //stream 객체의 on 함수 호출. on 함수에는 문자열과 함수가 하나씩 전달된다.
    //트윗이 발생할 때 해당 데이터에 의해 이 함수가 호출됨을 의미. 그 시점에 tweet.text 를 출력. 
    // #GoodsBot 해시태그 사용으로 전달된 트윗의 실제 텍스트에 접근할 수 있다.


