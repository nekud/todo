var $taskInput = $("#txtNewTask");
var $calendar = $("#calendar")
var $url = "https://www.fsi.illinois.edu/demo/data.cfm";
var $apikey = "37a99194b94b2c1aeae3cd3b30ab7b9b";
var $incompleteTasksList = $("#incomplete-tasks");
var $completedTasksList = $("#completed-tasks");
$(document).ready(function(){
    taskItem.GetTaskItems();
  });
var taskItem = {
    
    create: function(name, duedate, completed, taskid) {
        //var name = $taskInput.val();
        //var duedate = $calendar.val();
        if (name.length > 0 && duedate.length > 0) {
            var task = $('<li></li>');
            
            task.attr('name', 'Task');
            task.data('name', name);
            task.data('duedate', duedate);
            task.data('status', 'pending');
            var checkbox = addElement.checkbox('taskItem.toggleStatus(this)');
            task.append(addElement.spantaskid(taskid));
            task.append(checkbox);
            task.append(addElement.span(name));
            task.append(addElement.spandate(duedate));
            task.append(addElement.button('Edit', 'taskItem.edit(this)').addClass("edit"));
            task.append(addElement.button('Delete', 'taskItem.delete(this)').addClass("delete"));
            if(completed == 0){
                $incompleteTasksList.append(task);
            }
            else {
                checkbox.attr('checked', 'true');
                $completedTasksList.append(task);
                
            }
            
        }
        else{
            alert("Please enter a task");
        }
    },
    
    toggleStatus: function(input) {
        var task = $(input).parents('li[name="Task"]');
        var span = task.children('span[name="Name"]');
        var spandate = task.children('span[name="Duedate"]');
        var edittaskid = task.children('span[name="taskid"]');
        var complete = 0;
        if (input.checked) {
            task.detach();
            $completedTasksList.append(task);
            complete = 1;
        } else {
            task.detach();
            $incompleteTasksList.append(task);
            
        }

        taskItem.UpdateTask(span.text(), spandate.text(), complete, edittaskid.text());
    },
    
    edit: function(button) {
        var task = $(button).parents('li[name="Task"]');
        var span = task.children('span[name="Name"]');
        var spandate = task.children('span[name="Duedate"]');
        var edit = task.children('button[name="Edit"]');
        var save = addElement.button('Save', 'taskItem.save(this)');
        var dlt = task.children('button[name="Delete"]');
        var cancel = addElement.button('Cancel', 'taskItem.cancel(this)');
        //alert(spandate.text());
        var input = $('<input>');
        input.val(task.data('name'));
        input.attr('name', 'Edit');
        
        var inputDate = $("<input>");
        inputDate.val(task.data('duedate'));
        inputDate.attr('name', 'EditedDate');
        
        span.replaceWith(input);
        spandate.replaceWith(inputDate);
        edit.replaceWith(save);
        dlt.replaceWith(cancel);
    },
    
    save: function(button) {
        var task = $(button).parents('li[name="Task"]');
        var input = task.children('input[name="Edit"]');
        var inputDate = task.children('input[name="EditedDate"]');
        var chk = task.children('input[name="chk"]');
        var edittaskid = task.children('span[name="taskid"]');
        input.focus();
        task.data('name', input.val());
        task.data('duedate', inputDate.val());
        
        var span = addElement.span(task.data('name'));
        var spandate = addElement.spandate(task.data('duedate'));
        var edit = addElement.button('Edit', 'taskItem.edit(this)');
        var save = task.children('button[name="Save"]');
        var complete = 0;
        if(chk.prop("checked") == true){
            complete = 1;            
        }
        taskItem.UpdateTask(input.val(), inputDate.val(), complete, edittaskid.text());
        inputDate.replaceWith(spandate);
        input.replaceWith(span);
        save.replaceWith(edit);

    },
   
    delete: function(button) {
        var task = $(button).parents('li[name="Task"]');
        var taskid = task.children('span[name="taskid"]');
        taskItem.DeleteTask(taskid.text());
        task.remove();
    },
    cancel: function(button) {
        var task = $(button).parents('li[name="Task"]');
        var input = task.children('input[name="Edit"]');
        var inputDate = task.children('input[name="EditedDate"]');
        var cancel = task.children('button[name="Cancel"]');
        var save = task.children('button[name="Save"]');
        var span = addElement.span(task.data('name'));
        var spandate = addElement.spandate(task.data('duedate'));
        var edit = addElement.button('Edit', 'taskItem.edit(this)');
        var dlt = addElement.button('Delete', 'taskItem.delete(this)');
        inputDate.replaceWith(spandate);
        input.replaceWith(span);
        save.replaceWith(edit);
        cancel.replaceWith(dlt);
    },
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
                    taskItem.create(items.task_description, items.due_date, items.completed, items.task_id);
                    
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
    
};

// creating elements for the page

var addElement = {
    checkbox: function(onchange) {
        var checkbox = $('<input>');
        checkbox.attr('type', 'checkbox');
        checkbox.attr('onchange', onchange);
        checkbox.attr('name', 'chk');
        return checkbox;
    },
 
    span: function(text) {
        var span = $('<span></span>');
        span.attr('name', 'Name');
        span.text(text);
 
        return span;
    },
    spantaskid: function(text) {
        var span = $('<span style="display:none"></span>');
        span.attr('name', 'taskid');
        span.text(text);
        return span;
    },

    button: function(text, onclick) {
        var button = $('<button></button>');
        button.attr('onclick', onclick);
        button.attr('type', 'button');
        button.attr('name', text);
        button.text(text);
 
        return button;
    },

    spandate: function(text) {
        var spandate = $('<span></span>');
        spandate.attr('name', "Duedate");
        spandate.text(text);
        return spandate;
    }
};

$taskInput.focus();
$("#add").on("click", function(){
    if($taskInput.val().length > 0){
        var newtaskid = taskItem.CreateTask($taskInput.val(), $calendar.val());
        taskItem.create($taskInput.val(), $calendar.val(), "0", newtaskid);
        
        $taskInput.val('');
        $calendar.val('mm/dd/yyyy');
    }
});