
app.controller('MainCtrl', function($scope,$http) {

    $scope.questions=[]; 
    var version = 0;
    $scope.add = false;

    $scope.save = function(){
        var object = {
            version : version+=0.1,
            questions : $scope.questions
        };
        $http.post('/post',object).then(function(data){
            console.log(data);
        });
    };
    $scope.load = function(){
        $http.get('/get').then(function(data){
            $scope.questions = data.data.questions;
            version = parseFloat(data.data.version);
        });
    }
    $scope.message = '';
    $scope.addQuestion = function(question){
        var matches;
        angular.forEach($scope.questions, function(item) {
            if (question.id === item.id || question.word === item.word ) {
                matches == false;
                $scope.message = 'You have already selected to withdraw this item!';
                console.log("asd");
            }
        });
        if (matches !== false) {
            console.log(matches);
            $scope.questions.push(question);
        }
    }

});
