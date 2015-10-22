
(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$http', 'DataSrvc', '$scope'];

    function MainCtrl($http, DataSrvc, $scope) {

        var version = 0;
        $scope.add = false;
        $scope.toggleView = toggleView;
        $scope.save = saveOnServer;
        $scope.load = loadFromServer;
        $scope.addQuestion = addQuestion;

        function toggleView(){
            $scope.add = !$scope.add;
        };

        function saveOnServer() {
            $scope.data.version = versionIncrement($scope.data.version, 2, 0.01);
            DataSrvc.saveNewList($scope.data);
        };

        function versionIncrement(value, presicion, step){
            var num = parseFloat(value) || 0.0;
            num += step;
            return num.toFixed(presicion);
        };

        function loadFromServer() {
            return DataSrvc.getList()
                .then(function(data) {
                    data.version = parseFloat(data.version);
                    return data;
                }).then(function(data){
                    $scope.add = false;
                    $scope.data = data;
                });
        };

        function addQuestion(isValid) {
          if(isValid){
            $scope.question.choices = $scope.question.choices.split(',');
            $scope.data.questions.push($scope.question);
            $scope.question = {};
            $scope.toggleView();
          }
        };
    }

})();


(function(){
    angular.module('app')
        .service('DataSrvc', DataSrvc);

    DataSrvc.$inject = ['$http','$log'];

    function DataSrvc($http,$log){
        return {
            getList : getList,
            saveNewList : saveNewList
        };

        function getList(){
            return $http.get("/list")
                .then( requestCompleteHandler );
        };

        function saveNewList(list){
            return $http.post("/list", list)
                .then( requestCompleteHandler );
        };

        function requestCompleteHandler(response) {
            return response.data;
        };
    };
})();

(function(){

    angular.module('app').directive('unique', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        ctrl.$validators.unique = function(modelValue, viewValue) {

          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }

          if (viewValue) {
            var match = true;
            angular.forEach(scope.data.questions, function(item) {

                if (viewValue == parseInt(item.id)){
                    match = false;
                    return;
                }
            });
            return match;
          }
          return true;
        };
      }
    };
  })
    .directive('qform',function(){
      return {
        restrict : 'E',
        templateUrl : 'tpls/question-form.html'
      }
    });

})();



