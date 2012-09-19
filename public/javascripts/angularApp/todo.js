function TodoCtrl($scope,$http) {
    $scope.todos=[];

    $http.get('/bb/todos').success(function(data) {
        $scope.todos = data;
    });

    $scope.dispOrder=function(){
        var count=0;
        angular.forEach($scope.todos, function(todo) {
            if(todo.disp_order>count){
                count=todo.disp_order;
            }
        })
        return count;
    };

    $scope.addTodo = function() {
        var iValue=$scope.dispOrder();
        $http.post('/bb/todos',{disp_order:(iValue+1),text:$scope.todoText, done:false}).success(function(data){
            $scope.todos.push({id:data.id,disp_order:(iValue+1),text:$scope.todoText, done:false});
            $scope.todoText = '';
        })
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.clearCompleted=function(){
        var completed=$scope.todos.filter(function(val){
            return val.done==true;
        });
        angular.forEach(completed, function(todo) {
            $scope.remove(todo);
        });
    };

    $scope.completed=function(){
        var count=0;
        count=$scope.todos.length-$scope.remaining();
        return count;
    };

    $scope.completedWord=function(){
        var term='task';
        if($scope.completed()>1){
            term='tasks';
        }
        return term;
    };

    $scope.remainingWord=function(){
        var term='task';
        if($scope.remaining()>1){
            term='tasks';
        }
        return term;
    };

    $scope.displayStats=function(){
        var myStyle=false;
        if($scope.remaining()>0){
            myStyle=true;
        }
        return myStyle;
    };

    $scope.displayCompleted=function(){
        var myStyle=false;
        if($scope.completed()>0){
            myStyle=true;
        }
        return myStyle;
    };

    $scope.remove= function(todo) {
        $http.delete('/bb/todos/'+todo.id).success(function(){
            $scope.todos=$scope.todos.filter(function(val){
               return val.id!=todo.id;
            });
        });
    };

    $scope.displayTip=false;

    $scope.showToolTip=function(){
        $('.ui-tooltip-top').show();
        $('.ui-tooltip-top').fadeOut();
//        var timer=setTimeout($('.ui-tooltip-top').show(),100000);
//        clearTimeout(timer);
        $('.ui-tooltip-top').hide();
    };

    $scope.updateStatus=function(todo){
        $http.put('/bb/todos/'+todo.id,todo);
    }
}