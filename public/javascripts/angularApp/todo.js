function TodoCtrl($scope) {

    $scope.todos = [
        {index:1,text:'learn angular', done:true},
        {index:2,text:'build an angular app', done:false}];

    $scope.lastSize=$scope.todos.length;

    $scope.addTodo = function() {
        var iValue=$scope.lastSize;
        $scope.todos.push({index:(iValue+1),text:$scope.todoText, done:false});
        $scope.todoText = '';
        $scope.lastSize++;
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
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
        var index=todo.index;
        var oldTodos=$scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if(todo.index!=index){
                $scope.todos.push(todo);
            }
        });
        angular.element('#'+index).parent().remove();
    };

    $scope.displayTip=false;

    $scope.showToolTip=function(){
        $('.ui-tooltip-top').show();
        $('.ui-tooltip-top').fadeOut(1600);
//        var timer=setTimeout($('.ui-tooltip-top').show(),1000);
//        clearTimeout(timer);
        $('.ui-tooltip-top').hide();
    };

}