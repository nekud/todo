var todooperations = todooperations || (todooperations = {});
todooperations.taskoperation = todooperations.taskoperation || (todooperations.taskoperation = {});

var $url = "https://www.fsi.illinois.edu/demo/data.cfm";
var $apikey = "37a99194b94b2c1aeae3cd3b30ab7b9b";
var taskoperation = {

    GetTaskItems: function () {
        var keyIdHighlight = 0;
        var _this = this;
        $.ajax({
            type: "POST",
            async: true,
            url: $url,
            contentType: "application/json; charset=utf8",
            dataType: "json",
            data: JSON.stringify({"action": "getTasks", "apiKey": $apikey}),
            success: function (data) {
                $.each(data, function(i, items){
                    todo.taskItem.create(items.task_description, items.due_date, items.completed, items.task_id);
                    
                });

            },
            error: function (xhr, response, errorThrown) {
                console.log(xhr.responseText);
            }
        });
        
    },
    UpdateTask: function (description, duedate, completed, taskid) {
        var keyIdHighlight = 0;
        var _this = this;

        $.ajax({
            type: "POST",
            async: true,
            url: $url,
            contentType: "application/json; charset=utf8",
            dataType: "json",
            data: JSON.stringify(
            {
                "action": "updateTask",
                "task_description": description,
                "due_date": duedate,
                "completed": completed,
                "task_id": taskid,
                "apiKey": $apikey
            }),
            success: function (data) {
                alert("update successful");

            },
            error: function (xhr, response, errorThrown) {
                console.log(xhr.responseText);
            }
        });
        
    },
    DeleteTask: function (taskid) {
        var keyIdHighlight = 0;
        var _this = this;

        $.ajax({
            type: "POST",
            async: true,
            url: $url,
            contentType: "application/json; charset=utf8",
            dataType: "json",
            data: JSON.stringify(
                {
                    action : "deleteTask",
                    task_id : taskid,
                    apiKey : $apikey
                }
            ),
            success: function (data) {
            
            },
            error: function (xhr, response, errorThrown) {
                console.log(xhr.responseText);
            }
        });
        
    },
    CreateTask: function (description, duedate) {
        var keyIdHighlight = 0;
        var _this = this;

        $.ajax({
            type: "POST",
            async: true,
            url: $url,
            contentType: "application/json; charset=utf8",
            data: JSON.stringify({
                "action" : "createTask",
                "task_description" : description,
                "due_date" : duedate,
                "completed" : "0",
                "apiKey": $apikey
            }),
            dataType: "json",
            success: function (data) {
            
            },
            error: function (xhr, response, errorThrown) {
                console.log(xhr.responseText);
            }
        });
        
    },
}